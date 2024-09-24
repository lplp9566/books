 export interface User {
    username:string,
    password:string,
    id?:string,
    books?:Book[]
}
interface Book {
    id?:string,
    title:string,
    auster:string

}