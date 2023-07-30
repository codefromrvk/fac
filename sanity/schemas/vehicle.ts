
import { defineField, defineType } from 'sanity'
import MultiSelectImages from '../components/multi-select'

export default defineType({
    name: 'vehicle',
    title: 'Vehicle',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'kmDriven',
            title: 'KM Driven',
            type: 'number',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'details',
            title: 'Details',
            type: 'text',
            // of: [{ type: 'block' }]
            // validation: Rule => Rule.required()
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'ownerNumber',
            title: 'No. of owners',
            type: 'string',
            description: "1st/2nd/3rd/4th/4+",
            options: {
                list: [
                    { title: "1st", value: "1st" },
                    { title: "2nd", value: "2nd" },
                    { title: "3rd", value: "3rd" },
                    { title: "4th", value: "4th" },
                    { title: "4+", value: "4+" },
                ],
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'fuel',
            title: 'Fuel',
            type: 'string',
            description: "CNG/Diesel/Petrol/Electric/LPG",
            options: {
                list: [
                    { title: "CNG", value: "CNG" },
                    { title: "Diesel", value: "diesel" },
                    { title: "Petrol", value: "petrol" },
                    { title: "Electric", value: "electric" },
                    { title: "LPG", value: "LPG" },
                ],
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'transmission',
            title: 'Transmission',
            type: 'string',
            description: "Automatic/Manual",
            options: {
                list: [
                    { title: "Automatic", value: "automatic" },
                    { title: "Manual", value: "manual" },
                ],
            },
        }),
        // defineField({
        //   name: 'photos',
        //   title: 'Fuel',
        //   type: 'array',
        //   of:[{

        //     type:'image'
        //   }],
        //   components:{
        //     input:MultiSelectImages
        //   }
        // }),
        defineField({
            name: 'user',
            title: 'User',
            type: 'reference',
            to: { type: 'user' },
            validation: Rule => Rule.required()
        }),
        defineField({
            type: 'array',
            name: 'photo',
            title: 'Photos',
            of: [
                {
                    type: 'image', options: { hotspot: true },
                    // fields: [{
                    //     name: 'caption',
                    //     type: 'string',
                    //     title: 'Caption',
                    //     options: {
                    //         isHighlighted: true // &lt;-- make this field easily accessible          
                    //     }
                    // }]
                },
            ],
            validation: Rule => Rule.required(),
            options: {
                layout: 'grid'
            }
        })

    ],
    // preview: {
    //   select: {
    //     title: 'name',
    //     media: 'image',
    //   },
    // },
})



