const state = reactive({
    products: [] as IProduct[],
})

interface IProduct {
    uuid: string
    content: any
    slug: string
}

export function useProducts() {
    const storyblokApi = useStoryblokApi()

    async function fetchProducts() {
        let params = {
            version: 'draft',
            starts_with: 'productos/',
            is_startpage: false,
        }

        const { data } = await storyblokApi.get("cdn/stories/", params as any)

        state.products = data.stories.map(
            ({uuid, content, slug}: IProduct) => { return { uuid, content, slug } }
        )
    }

    return {
        ...toRefs(state),
        fetchProducts,
    }
}
