import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: "mh3wu7yl",
    dataset: 'production',
    apiVersion: "2024-06-04",
    useCdn: true,
    token: "skMEKUv0D4ZRX2Xo5NNIPfpKPzkaLjThoulNeY8dHQjvKYuK9Xh51V3J2aHuWEzSn26YtpNwnJTm5HyxNughakptPRlAZpHNQ8mTbZEiVmsnUW2XQqAXhjbNiqphIpcwKX4uz3WRBZ9lG7kzFg4XS0mR7lGD3RGaBY1DMb2g8FxLWUJ68PaR"
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
