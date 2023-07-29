import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import author from './schemas/author'
import user from './schemas/user'
import vehicle from './schemas/vehicle'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user,vehicle],
}
