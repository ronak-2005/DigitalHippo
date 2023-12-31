import { CollectionConfig } from "payload/types";

// import { PrimaryActionEmailHtml } from '../components/emails/PrimaryActionEmail'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<P> HELLO </P>`
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
 
    fields : [
        {
            name : 'role' ,
            defaultValue : 'users',
            required : true ,
            type : 'select',
            options : [
                {
                    value : 'admin',
                    label : 'Admin'
                },
                {
                    value : 'user',
                    label : 'User'
                },
            ]
        }
    ]
}