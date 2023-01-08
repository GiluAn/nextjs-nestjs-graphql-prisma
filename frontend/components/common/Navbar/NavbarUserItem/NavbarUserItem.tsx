import Button from '@components/common/Button';
import { AuthState } from 'lib/providers/AuthProvider';

interface NavbarUserItemProps {
  state: AuthState;
  signOut: Function;
  onOpen: () => void;
}

const NavbarUserItem = ({ state, signOut, onOpen }: NavbarUserItemProps) => {
  if (state.isLoading) {
    return <></>;
  }

  if (state.authenticated) {
    return (
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={() => signOut()}
      >
        <span className="sr-only">Open user menu</span>
        <div className="w-8 h-8 flex rounded-full bg-purple-400 content-center items-center justify-center">
          <div>U</div>
        </div>
      </button>
    );
  }

  return <Button onClick={onOpen}>로그인</Button>;
};

export default NavbarUserItem;
