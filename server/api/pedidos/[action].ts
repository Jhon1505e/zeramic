export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = event.context.params;

  const MONGO_URL_ENDPOINT = process.env.MONGO_URL_ENDPOINT;
  const MONGO_API_KEY = process.env.MONGO_API_KEY;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": MONGO_API_KEY || "",
  };

  const body: any = {
    dataSource: "Tailors",
    database: "tailorsdb",
    collection: "clients",
  };

  params?.action === "insertOne"
    ? (body.document = query)
    : (body.filter = query);

  try {
    const data: any = await $fetch(
      `${MONGO_URL_ENDPOINT}/action/${params?.action}`,
      {
        method: "POST",
        headers,
        body,
      }
    );
    console.log(data)
    return params?.action === "find" ? formatData(data) : data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

const formatData = ({ documents }: { documents: any[] }) =>
  documents.map((doc: any) => {
    const { productos } = doc;
    doc.productos = Array.isArray(productos)
      ? productos.map((item: any) =>
          typeof item === "string" ? JSON.parse(item) : item
        )
      : productos
      ? [JSON.parse(productos)]
      : [];
    return doc;
  });
