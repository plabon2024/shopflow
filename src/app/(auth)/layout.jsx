import Logo from '@/components/Logo/Logo'

export default function layout({children}) {
  return (
    <div className='p-10'>
        <Logo></Logo>
        {children}
    </div>
  )
}
