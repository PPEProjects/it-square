import {PropType} from "vue";
import {ReviewDocument} from "@entities/review";

import StarRating from '../includes/StarRating.vue'

export default defineComponent({
    name: 'ReviewItem',
    components: {
        StarRating
    },
    props: {
        review: {
            type: Object as PropType<ReviewDocument>,
            required: true
        }
    },
    render() {

        // Avatar Block
        const avatarRef = h('div', {
            class:'flex-shrink-0'
        }, [
            h('div', { class: 'w-14 h-14 rounded-full overflow-hidden border-[3px] border-white cutsom-shadow'}, [
                h('img', {
                    src: this.review.user.avatar,
                    alt: this.review.user.name,
                    class: 'w-full h-full object-cover'
                })
            ])
        ])
        //Content with mention
        // Tranform mentions to Vue3 VNode
        const mentions = this.review.content
            .replaceAll(/@\S*/g, (mention) => `-%-${mention}-%-`)
            .split('-%-')
            .filter((word) => word)
            .map((word) => {

                // là mention
                if(/^@\S*$/.test(word)) {
                    const mention = this.review.mentions.find((mention) => mention.slug === word.replace('@', ''))
                    if(mention) {
                        return h('a', { class: 'font-semibold', href: 'javascript:void(0)' }, mention.name)
                    }
                }
                return word
            })

        // Content Block
        const contentRef = h('div', { class: 'w-full pl-3' }, [
            h('div', { class: 'flex items-center mb-1' }, [
                h('h4', { class: 'mb-0 font-semibold text-[16px]' }, this.review.user.name),
                h('span', { class: 'ml-3 text-[13px] text-gray-400' }, 'Hôm Qua')
            ]),
            h(StarRating, { rating: this.review.rating, class: 'text-[11px]' }),
            h('div', { class: 'text-gray-500 mt-2' }, mentions)
        ])

        return [
            h('div', { class: 'flex' }, [
                avatarRef,
                contentRef
            ])
        ]
    }
})
