import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Avatar,
  MediaQuery,
  Burger,
  Menu,
  NavLink,
  useMantineTheme,
  ActionIcon, 
  useMantineColorScheme
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import PageBreadcrumbs from '../components/ui/Breadcrumb';
import NavLinks from '../components/ui/NavLinks'

export default function AppShellDemo() {
  const theme = useMantineTheme();
  
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <AppShell
      styles={{main: { background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],},}}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} className='navbar'>
          <NavLinks />
        </Navbar>
      }
     
      
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }} className='header'>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <div className='site-logo'><Image src="/logo.png" priority="true"  fill alt="localbly logo"/></div>
              <div className='nav-options'>
                <Menu withArrow>
                  <Menu.Target><Avatar color="cyan" radius="xl">MK</Avatar></Menu.Target>
                  <Menu.Dropdown>
                    <NavLink icon={<i class="ri-login-circle-line"></i>} component={Link} href="/" label="Log-out" />
                    <NavLink icon={<i class="ri-user-3-line"></i>} component={Link} href="/profile" label="Profile" />
                  </Menu.Dropdown>
                </Menu>
                <div className="user">
                  <Text fz="md">Peter</Text>
                </div>
              </div>
          </div>
          
        </Header>
      }
    >
      <ActionIcon
        variant="outline"
        size="xl"
        radius="xl"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
        className='floatingBtn'
      >
                {dark ? <i class="ri-sun-line"></i> : <i class="ri-contrast-2-fill"></i>  }
      </ActionIcon>
      <PageBreadcrumbs />
    </AppShell>
  );
}