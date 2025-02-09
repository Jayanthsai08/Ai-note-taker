import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Layout, Shield } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadPdfDialog from './UploadPdfDialog'



function SideBar() {
  return (
    <div className='shadow-lg h-screen p-7'>
        <Image src={'/logo.svg'} alt='logo' width={80} height={160}/>
        <div className='mt-10'>
            

          <UploadPdfDialog>
          <Button className='w-full'> + Upload PDF</Button>
            </UploadPdfDialog>

            <div className='flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer'>
                <Layout/>
                <h2>WorkSpace</h2>
            </div>

            <div className='flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer'>
                <Shield/>
                <h2>Upgrade</h2>
            </div>
        </div>

        <div className='absolute bottom-24 w-[80%]'>
        <Progress value={40} />
        <p className='text-sm mt-1'>2 out of 5 PDF's Uploaded</p>

        <p className='text-sm text-gray-500 mt-2'>Upgrade to upload more PDF's</p>
        </div>

    </div>
  )
}

export default SideBar