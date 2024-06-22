export default {
    name: 'pizza',
    title: 'Pizza',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'name',
        title: 'name',
        type: 'string'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxlength: 90
        }
      },
      {
        name: 'price',
        title: 'price',
        type: 'array',
        of: [{
          type: 'number'
        }]
      },
      {
        name: 'details',
        title: 'Details',
        type: 'string'
      }
    ]
  }