import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Footers = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full">
        <div className="flex justify-between ">
          <div className="">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text:xl font-semibold dark:text-white">
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span> Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <Footer.LinkGroup col>
              <Footer.Title title='About' />
              <Footer.Link
                href='https://www.100jsprojects.com'
                target='_blank'
                rel="noopener noreference"
              >
                100 JS Projects
              </Footer.Link>
              <Footer.Link
                href='/about'
                target='_blank'
                rel="noopener noreference"
              >
                About
              </Footer.Link>
            </Footer.LinkGroup>
            <Footer.LinkGroup col>
              <Footer.Title title='FOLLOW US' />
              <Footer.Link
                href='https://github.com/sahandghavidel'
                target='_blank'
                rel="noopener noreference"
              >
                Github
              </Footer.Link>
              <Footer.Link
                href='#'
                target='_blank'
                rel="noopener noreference"
              >
                Discord
              </Footer.Link>
            </Footer.LinkGroup>
            <Footer.LinkGroup col>
              <Footer.Title title='LEGAL' />
              <Footer.Link
                href='#'
                target='_blank'
                rel="noopener noreference"
              >
                Privacy Policy
              </Footer.Link>
              <Footer.Link
                href='#'
                target='_blank'
                rel="noopener noreference"
              >
                Terms & Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default Footers