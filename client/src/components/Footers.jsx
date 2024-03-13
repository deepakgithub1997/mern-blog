import { Footer } from 'flowbite-react';
import Logo from '../elements/Logo';

const Footers = () => {
  return (
    <Footer container className="border-t-8 border-teal-500">
      <div className="w-full">
        <div className="flex justify-between ">
          <div className="">
            <Logo size="text-sm sm:text:xl font-semibold" />
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