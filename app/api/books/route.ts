

const books = [ 
    {id: 1, name: "Atomic habbit"},
    {id: 2, name: "Deep Work"},
    {id: 3, name: "Time management"}
]



export async function GET(){
    return Response.json(books)
}