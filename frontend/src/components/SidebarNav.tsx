import { Sidebar } from '@bigbinary/neetoui/layouts';
import { Clock } from '@bigbinary/neeto-icons';

export default function SidebarNav() {
  const navLinks = [
    { label: 'Inspector', to: '#', icon: Clock }
  ];
  return (
    <Sidebar navLinks={navLinks} />
  );
}
