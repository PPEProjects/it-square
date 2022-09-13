import {API} from "@editorjs/editorjs"
import './index.css'
import {mentionInlineToolIcon} from "@utils/editor/mentions/render/icon";
import {MentionMakerConfig, MentionMakerInlineConfig} from "@utils/editor/mentions/type";

export default class MentionMaker {
    #api: API
    #config?: MentionMakerInlineConfig

    #state = false

    #button!:HTMLButtonElement
    #action!: HTMLDivElement

    static isSurroundEnabled = true

    static get CSS() {
        return 'cdx-mention';
    }

    static get isInline() {
        return true
    }

    get state() {
        return this.#state;
    }

    set state(state) {
        this.#state = state;

        this.#button.classList.toggle(this.#api.styles.inlineToolButtonActive, state);
    }

    static get sanitize() {
        return {
            u: {
                class: MentionMaker.CSS,
            }
        };
    }

    static get title() {
        return "Mention"
    }

    static get shortcut() {
        return "CMD+M"
    }

    constructor({ api, config }: MentionMakerConfig) {
        if(!config) {
            throw new Error('MentionMaker config is required')
        }

        this.#api = api
        this.#config = config
    }

    render() {
        this.#button = document.createElement('button')
        this.#button.type = 'button'
        this.#button.classList.add('cdx-mention__inline-tool')
        this.#button.innerHTML = mentionInlineToolIcon
        return this.#button
    }

    async surround(range: Range) {
        if (this.state) {
            this.unwrap(range)
            return
        }

        await this.wrap(range)
    }

    async wrap(range: Range) {
        const selectedText = range.extractContents().textContent || ''

        if(!selectedText.trim()) {
            return
        }

        const users = await this.#config?.fetch(selectedText)

        if (!users?.length) {
            this.showEmpty()
            return
        }

        const mark = document.createElement('span')
        mark.textContent = selectedText
        mark.classList.add('bg-primary-50')
        range.insertNode(mark)

        this.#api.selection.expandToTag(mark)


        const $container: HTMLDivElement = document.createElement('div')
        $container.classList.add('cdx-mention__container')

        users.forEach(user => {
            const $user: HTMLDivElement = document.createElement('div')
            $user.classList.add('cdx-mention__user')
            $user.innerHTML = `
                <div class="cdx-mention__user-avatar">
                    <img src="${user.avatar}" alt="${user.name}" />
                </div>
                <div class="cdx-mention__user-name">${user.name}</div>
            `

            $user.addEventListener('click', () => {
                mark.classList.remove('bg-primary-50')
                mark.classList.add('cdx-mention-active')
                mark.textContent = user.name

                this.hidenPicker()
            })

            $container.appendChild($user)
        })

        const rect = mark.getBoundingClientRect()

        $container.style.top = rect.top - 10 + 'px'
        $container.style.left = rect.left + 'px'
        $container.style.width = '200px'

        document.body.appendChild($container)

        setTimeout(() => {
            $container.classList.add('openned')
        }, 100)

        // document.addEventListener('click', (e) => {
        //     if (e.target !== $container || e.target !== this.#api.ui.nodes.redactor) {
        //         this.hidenPicker()
        //     }
        // })
    }

    unwrap(range: Range) {
        const mark = this.#api.selection.findParentTag('span', 'cdx-mention-active')
        const text = range.extractContents()

        mark?.remove()

        range.insertNode(text)
    }

    checkState() {
        const mark = this.#api.selection.findParentTag('span', 'cdx-mention-active')
        this.state = !!mark;

        if (this.state) {
            this.showActions(mark!)
        } else {
            this.hideActions()
        }
    }

    /**
     * Gỡ bỏ mention
     * @param mark
     */
    showActions(mark: HTMLElement) {
        console.log(mark)
        this.#action.classList.remove('cdx-mention__picker--hidden')
    }


    hideActions() {
        this.#action.classList.add('cdx-mention__picker--hidden')
    }

    renderActions() {
        this.#action = document.createElement('div')
        this.#action.classList.add('cdx-mention__picker', 'cdx-mention__picker--hidden')
        this.#action.innerHTML = ``

        return this.#action
    }

    hidenPicker() {
        const $parent = document.querySelector('.cdx-mention__container')
        $parent?.classList.remove('openned')
        setTimeout(() => {
            $parent?.remove()
        }, 500)
    }

    showEmpty() {
        //
    }

    /**
     * Tự clear
     */
    clear() {
        // console.log('clear')
    }
}
