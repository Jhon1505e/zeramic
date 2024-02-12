const state = reactive({
    products: [],
})

export function useProducts() {
    const storyblokApi = useStoryblokApi()

    async function fetchProducts() {
        let params = {
            version: 'draft',
            starts_with: 'productos/',
        }

        const { data } = await storyblokApi.get("cdn/stories/", params as any)

        state.products = data.stories.map(
            ({uuid, content, slug}: any) => { return { uuid, content, slug } }
        )
    }

    return {
        ...toRefs(state),
        fetchProducts,
    }
}
