import {API, InlineTool, SanitizerConfig} from "@editorjs/editorjs"
import './index.css'
import {mentionInlineToolIcon} from "@utils/editor/mentions/render/icon";
import {MentionMakerConfig, MentionMakerInlineConfig} from "@utils/editor/mentions/type";

export default class MentionMaker implements InlineTool {
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

    static get sanitize(): SanitizerConfig {
        return {
            span: {
                class: MentionMaker.CSS,
                'data-id': true,
                'data-name': true,
                'data-avatar': true
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

        const $parent = document.createElement('div')
        $parent.classList.add('cdx-mention__overlay')

        // Todo: find other way to append to close picker
        const $backdrop = document.createElement('a')
        $backdrop.classList.add('cdx-mention__backdrop')
        $backdrop.addEventListener('click', () => {
            this.hidenPicker()
        })

        $parent.appendChild($backdrop)

        const $body: HTMLDivElement = document.createElement('div')
        $body.classList.add('cdx-mention__container')

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
                mark.setAttribute('data-id', user.id)
                mark.setAttribute('data-name', user.name)
                mark.setAttribute('data-avatar', user.avatar)
                mark.classList.remove('bg-primary-50')
                mark.classList.add(MentionMaker.CSS)
                mark.textContent = '@' + user.name

                this.hidenPicker()
            })

            $body.appendChild($user)
        })

        const rect = mark.getBoundingClientRect()

        $body.style.top = rect.top - 10 + 'px'
        $body.style.left = rect.left + 'px'
        $body.style.width = '200px'

        $parent.appendChild($body)
        document.body.appendChild($parent)

        setTimeout(() => {
            $body.classList.add('openned')
        }, 100)

        // document.addEventListener('click', (e) => {
        //     if (e.target !== $body || e.target !== this.#api.ui.nodes.redactor) {
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
        return this.#state
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
        const $parent = document.querySelector('.cdx-mention__overlay')
        $parent?.querySelector('.cdx-mention__container')?.classList.remove('openned')
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
