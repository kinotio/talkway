import HeroComponent from '@/components/root/HeroComponent'
import AuthFormComponent from '@/components/root/AuthComponent'

const Page = () => {
  return (
    <section className='bg-white'>
      <div className='container px-6 py-24 mx-auto lg:py-32'>
        <div className='lg:flex'>
          <div className='lg:w-1/2'>
            <HeroComponent />
          </div>

          <div className='mt-8 lg:w-1/2 lg:mt-0'>
            <div className='w-full lg:max-w-xl'>
              <AuthFormComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
