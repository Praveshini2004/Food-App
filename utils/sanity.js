// utils/sanity.js
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'mh3wu7yl', // Your Sanity project ID
  dataset: 'production', // Your Sanity dataset
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export default client;
