import {App} from "vue";
import {TinyMCE} from "tinymce";

declare global {
    interface Window {
        $vue: App<Element>
        tinymce: TinyMCE
    }
}

