import { MongoClient } from 'mongodb'

const uri =
  'mongodb+srv://ali123:ali123@mongoali.qcgnw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const dbConnect = async () => {
  let client
  client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return client
}
export default dbConnect
