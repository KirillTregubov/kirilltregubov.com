import Link from 'next/link'
import { HideOnMouseStop } from 'react-hide-on-mouse-stop'

const GreenScreen: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 h-screen w-screen bg-[#02ff01]"></div>
      <HideOnMouseStop delay={1000} defaultTransition hideCursor>
        <div className="absolute bottom-0 w-screen">
          <p className="w-full bg-transparent pb-2 text-center text-base font-medium text-[#003300]">
            Made with ❤ by{' '}
            <Link href="/" className="font-semibold">

              {/* relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:rounded-full after:bg-[#003300] after:content-[''] */}Kirill Tregubov
            </Link>
          </p>
        </div>
      </HideOnMouseStop>
    </div>
  );
}

export default GreenScreen
