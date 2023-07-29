import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'phoneNumber',
            title: 'Phone Number',
            type: 'number',
        }),
        defineField({
            name: 'displayPhoto',
            title: 'Display Photo',
            type: 'image',
        }),
        // defineField({
        //     type: 'array',
        //     name: 'image',
        //     title: 'Gallery Image',
        //     of: [
        //         {
        //             type: 'image', options: { hotspot: true },
        //             fields: [{
        //                 name: 'caption',
        //                 type: 'string',
        //                 title: 'Caption',
        //                 options: {
        //                     isHighlighted: true // &lt;-- make this field easily accessible          
        //                 }
        //             }]
        //         },
        //     ],
        //     options: {
        //         layout: 'grid'
        //     }
        // })


    ]
})
