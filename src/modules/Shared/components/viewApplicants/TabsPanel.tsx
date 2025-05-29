// TabsPanel.tsx
import { Tabs } from "@mantine/core";

type TabsPanelProps = {
    tabs: { label: string; value: string; component: React.ReactNode }[];
};

export default function TabsPanel({ tabs }: TabsPanelProps) {
    return (
        <Tabs defaultValue={tabs[0]?.value}>
            <Tabs.List className="text-[#6D6D6D] space-x-6 pb-2">
                {tabs.map(tab => (
                    <Tabs.Tab key={tab.value} value={tab.value} className="font-semibold text-[16px]">
                        {tab.label}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
            {tabs.map(tab => (
                <Tabs.Panel key={tab.value} value={tab.value}>
                    {tab.component}
                </Tabs.Panel>
            ))}
        </Tabs>
    );
}
