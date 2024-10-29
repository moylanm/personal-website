import Image from 'next/image';

export default function NavbarLogo() {
  return <Image
    className='md:none mr-1'
    src='/yin-yang.png'
    width={32}
    height={32}
    alt='website logo'
  />
}
