<template>
  <textarea id="noveleditor"></textarea>
</template>

<script>
export default {
  name: "TinyEditor",
  data() {
    return {
      imageTemp: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const images_upload_handler = async (blobInfo, progress) => new Promise(async (resolve, reject) => {
        {
          const form = new FormData()
          form.append('action', 'codeby_upload_image')
          form.append('image', blobInfo.blob())
          try {
            const { data } = await this.$http.post('/wp-admin/admin-ajax.php', form)
            // window.test = success
            // success('https://codeby.xxx/wp-admin/admin-ajax.php');
            this.imageTemp.push({
              blob: blobInfo.blobUri(),
              url: data.data.data
            })
            resolve( data.data.data)
          } catch (e) {
            reject('Đăng tải thất bại');
          }
        }
      })
      window.tinymce.init({
        selector: '#noveleditor',
        height: 700,
        // language_url: '/wp-content/themes/mumoiravn.com/js/editor/vi.js',
        // language: 'vi',
        plugins: 'advlist autolink lists link image charmap preview anchor pagebreak lists table emoticons autosave quickbars media',
        toolbar1: 'undo redo | blocks fontfamily | ' +
            'bold italic forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify',
        toolbar2: 'bullist numlist outdent indent | ' +
            'table media image emoticons | removeformat restoredraft help',
        toolbar_mode: 'floating',
        file_picker_types: 'image',
        contextmenu: 'link image video table',
        file_picker_callback: async (cb, value, meta) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', async () => {
              /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
              */
              const id = 'blobid' + (new Date()).getTime();
              const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              const form = new FormData()
              form.append('action', 'codeby_upload_image')
              form.append('image', blobInfo.blob())
              const { data } = await this.$http.post('/wp-admin/admin-ajax.php', form)
              /* call the callback and populate the Title field with the file name */
              cb(data.data.data, { title: file.name });
            });
            reader.readAsDataURL(file);
          });
          input.click();
        },
        images_upload_handler
      })
    },
    getContent() {
      return window.tinymce.get('noveleditor').getContent()
    },
    reset() {
      window.tinymce.get('noveleditor').setContent('')
    }
  }
}
</script>
