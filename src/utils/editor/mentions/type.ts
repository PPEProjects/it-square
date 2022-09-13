import {InlineToolConstructorOptions} from "@editorjs/editorjs";

export interface MentionMakerResourceItem {
    id: string
    name: string
    avatar: string
    [key: string]: any
}

export interface MentionMakerInlineConfig {
    fetch: (query: string) => Awaited<MentionMakerResourceItem[]>
}

export interface MentionMakerConfig extends InlineToolConstructorOptions {
    config?: MentionMakerInlineConfig
}
