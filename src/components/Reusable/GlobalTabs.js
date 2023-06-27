import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
export default function GlobalTabs({ children }) {
    const [activeTab, setActiveTab] = useState(children[0].props.value);
  
    return (
      <>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List>
              {React.Children.map(children, (child) => (
                <Tabs.Tab value={child.props.value}>{child.props.label}</Tabs.Tab>
              ))}
            </Tabs.List>

          {React.Children.map(children, (child) => (
            <Tabs.Panel value={child.props.value}>{child.props.children}</Tabs.Panel>
          ))}
      </Tabs>
      </>
    );
}
  
