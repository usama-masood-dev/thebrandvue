import { WP_IMAGE_FIELDS } from "./fragments";

export const MEDIA_ITEMS_BY_IDS_QUERY = /* GraphQL */ `
  query MediaItemsByIds($ids: [ID], $first: Int = 100) {
    mediaItems(where: { in: $ids }, first: $first) {
      nodes {
        databaseId
        ${WP_IMAGE_FIELDS}
      }
    }
  }
`;
