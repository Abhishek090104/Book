
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({books}) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
    <thead>
      <tr>
        <th className='border border-slate-600 rounded-md'>No</th>
        <th className='border border-slate-600 rounded-md'>Title</th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
        <th className='border border-slate-600 rounded-md'>Operations</th>
      </tr>
    </thead>
    <tbody>
{books.map((book, index) => (
<tr key={book.id} className='h-8'>
<td
key={`${book.id}-no`}
className='border border-slate-700 rounded-md text-center'>
{book.id}
</td>
<td
key={`${book.id}-title`}
className='border border-slate-700 rounded-md text-center'>
{book.title}
</td>
<td
key={`${book.id}-author`}
className='border border-slate-700 rounded-md text-center max-md:hidden'>
{book.author}
</td>
<td
key={`${book.id}-publishYear`}
className='border border-slate-700 rounded-md text-center max-md:hidden'>
{book.publishyear}
</td>
<td
key={`${book.id}-operations`}
className='border border-slate-700 rounded-md text-center'>
<div className='flex justify-center gap-x-4'>
  <Link to={`/books/details/${book.id}`}>
    <BsInfoCircle className='text-2x1 text-green-800' />
  </Link>
  <Link to={`/books/edit/${book.id}`}>
    <AiOutlineEdit className='text-2x1 text-yellow-600' />
  </Link>
  <Link to={`/books/delete/${book.id}`}>
    <MdOutlineDelete className='text-2x1 text-red-600' />
  </Link>
  </div>
 </td>
</tr>
))}
</tbody>

</table>
  )
}

export default BooksTable