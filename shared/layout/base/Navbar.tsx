/**
 * @version    HRDotNet(v.2.0.0)
 * @file       Navbar/Sidebar Layout
 * @author     Hersvin Fred De La Cruz Labastida
 */

import React from 'react'
import {
  AppShell,
  ScrollArea,
  Image,
  Transition,
  Flex,
  TextInput,
  Divider,
  Text,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
//---  Lucide React Icons
import { Search } from "lucide-react";
//--- Other Modules
import { useLogoWidth } from "@shared/hooks/useWidth";
// import { SwitchCompany } from "@shared/layout/base/components/SwitchCompany";
import { TooltipIcon } from "@shared/layout/base/components/TooltipIcon";
import "@shared/layout/base/styles/navbar.css";
//--- Images
import logoword from "@shared/assets/images/logoword.webp";
import logoicon from "@shared/assets/images/icon.webp";
//--- Json Sample
import menuData from "@shared/services/menu.json";
import { iconMap } from "@shared/services/Icon";

export default function Navbar({ toggle }: { toggle: () => void }) {
  const { isLogowordVisible, toggleLogos } = useLogoWidth();

  return (
    <AppShell.Navbar p="md" flex="col">
      <AppShell.Section
        display="flex"
        className="flex-row justify-between items-center"
      >
        <Image
          src={logoword}
          hiddenFrom="sm"
          className="logo"
          onClick={toggle}
        />
        <Transition
          transition="scale"
          exitDuration={3}
          enterDelay={5}
          mounted={true}
        >
          {(styles) => (
            <>
              {isLogowordVisible ? (
                <Image
                  src={logoword}
                  visibleFrom="sm"
                  onClick={toggleLogos}
                  style={styles}
                  h={40}
                  className=""
                />
              ) : (
                <Image
                  src={logoicon}
                  h={35}
                  w={35}
                  visibleFrom="sm"
                  onClick={toggleLogos}
                  style={styles}
                />
              )}
            </>
          )}
        </Transition>
      </AppShell.Section>
      <AppShell.Section mt="lg">
        <Flex
          justify="flex-start"
          align={isLogowordVisible ? "flex-start" : "center"}
          direction="column"
          wrap="wrap"
          gap={10}
        >
          {/* <SwitchCompany /> */}
          {isLogowordVisible ? (
            <TextInput
              leftSection={<Search color="#559CDA" />}
              placeholder="Search Menu...."
              styles={{
                input: {
                  borderColor: "#559CDA",
                  borderWidth: 2,
                  borderRadius: 10,
                  color: "#559CDA",
                },
              }}
              className="w-full"
            />
          ) : (
            <div className="text-center mt-2">
              <Search size={20} color="black" />
            </div>
          )}
        </Flex>
      </AppShell.Section>

      <AppShell.Section my="md" component={ScrollArea}>
        <Flex
          justify="flex-start"
          align={isLogowordVisible ? "flex-start" : "center"}
          direction="column"
          wrap="wrap"
          mt={10}
          gap={10}
        >
          {menuData.main.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "module-active w-full rounded-lg"
                    : "w-full text-menuText"
                }
              >
                <Flex
                  key={item.id}
                  justify={isLogowordVisible ? "flex-start" : "center"}
                  align="flex-start"
                  direction="row"
                  wrap="wrap"
                  gap={15}
                  py={5}
                  w="100%"
                  className={`module ${isLogowordVisible ? "pl-4 font-regular rounded-lg" : null
                    }`}
                >
                  {isLogowordVisible ? (
                    <Icon size={22} />
                  ) : (
                    <TooltipIcon label={item.label} icon={<Icon size={22} />} />
                  )}
                  {isLogowordVisible && (
                    <Text className="no-underline  text-sm">{item.label}</Text>
                  )}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>


        <AppShell.Section mt={10}>
          <div className="text-menuText text-xs">
            {isLogowordVisible ? "Menu" : <Divider my="md" />}
          </div>
        </AppShell.Section>
        <Flex
          justify="flex-start"
          align={isLogowordVisible ? "flex-start" : "center"}
          direction="column"
          wrap="wrap"
          mt={10}
          gap={10}
        >
          {menuData.menu.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "module-active w-full rounded-lg"
                    : "w-full text-menuText"
                }
              >
                <Flex
                  key={item.id}
                  justify={isLogowordVisible ? "flex-start" : "center"}
                  align="flex-start"
                  direction="row"
                  wrap="wrap"
                  gap={15}
                  py={5}
                  w="100%"
                  className={`module ${isLogowordVisible ? "pl-4 font-regular rounded-lg" : null
                    }`}
                >
                  {isLogowordVisible ? (
                    <Icon size={22} />
                  ) : (
                    <TooltipIcon label={item.label} icon={<Icon size={22} />} />
                  )}
                  {isLogowordVisible && (
                    <Text className="no-underline text-sm">{item.label}</Text>
                  )}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>


        <AppShell.Section mt={10} w="auto">
          <div className="text-menuText text-xs">
            {isLogowordVisible ? "201  FILES" : <Divider my="md" />}
          </div>
        </AppShell.Section>
        <Flex
          justify="flex-start"
          align={isLogowordVisible ? "flex-start" : "center"}
          direction="column"
          wrap="wrap"
          mt={20}
          gap={10}
        >
          {menuData["201  FILES"].map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "module-active w-full rounded-lg"
                    : "w-full text-menuText"
                }
              >
                <Flex
                  key={item.id}
                  justify={isLogowordVisible ? "flex-start" : "center"}
                  align="flex-start"
                  direction="row"
                  wrap="wrap"
                  gap={15}
                  py={5}
                  w="100%"
                  className={`module ${isLogowordVisible ? "pl-4 font-regular rounded-lg" : null
                    }`}
                >
                  {isLogowordVisible ? (
                    <Icon size={22} />
                  ) : (
                    <TooltipIcon label={item.label} icon={<Icon size={22} />} />
                  )}
                  {isLogowordVisible && (
                    <Text className="no-underline text-sm">{item.label}</Text>
                  )}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        <AppShell.Section mt={10} w="auto">
          <div className="text-menuText text-xs">
            {isLogowordVisible ? "TIMEKEEPING" : <Divider my="md" />}
          </div>
        </AppShell.Section>
        <Flex
          justify="flex-start"
          align={isLogowordVisible ? "flex-start" : "center"}
          direction="column"
          wrap="wrap"
          mt={20}
          gap={10}
        >
          {menuData["TIMEKEEPING"].map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "module-active w-full rounded-lg"
                    : "w-full text-menuText "
                }
              >
                <Flex
                  key={item.id}
                  justify={isLogowordVisible ? "flex-start" : "center"}
                  align="flex-start"
                  direction="row"
                  wrap="wrap"
                  gap={15}
                  py={5}
                  w="100%"
                  className={`module ${isLogowordVisible ? "pl-4 font-regular rounded-lg" : null
                    }`}
                >
                  {isLogowordVisible ? (
                    <Icon size={22} />
                  ) : (
                    <TooltipIcon label={item.label} icon={<Icon size={22} />} />
                  )}
                  {isLogowordVisible && (
                    <Text className="no-underline text-sm">{item.label}</Text>
                  )}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        <AppShell.Section mt={10} w="auto">
          <div className="text-menuText text-xs">
            {isLogowordVisible ? "PAYROLL" : <Divider my="md" />}
          </div>
        </AppShell.Section>
        <Flex
          justify="flex-start"
          align={isLogowordVisible ? "flex-start" : "center"}
          direction="column"
          wrap="wrap"
          mt={20}
          gap={10}
        >
          {menuData["PAYROLL"].map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "module-active w-full rounded-lg"
                    : "w-full text-menuText"
                }
              >
                <Flex
                  key={item.id}
                  justify={isLogowordVisible ? "flex-start" : "center"}
                  align="flex-start"
                  direction="row"
                  wrap="wrap"
                  gap={15}
                  py={5}
                  w="100%"
                  className={`module ${isLogowordVisible ? "pl-4 font-regular rounded-lg" : null
                    }`}
                >
                  {isLogowordVisible ? (
                    <Icon size={22} />
                  ) : (
                    <TooltipIcon label={item.label} icon={<Icon size={22} />} />
                  )}
                  {isLogowordVisible && (
                    <Text className="no-underline text-sm">{item.label}</Text>
                  )}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        <AppShell.Section mt={10} w="auto">
          <div className="text-menuText text-xs">
            {isLogowordVisible ? "REPORTS" : <Divider my="md" />}
          </div>
        </AppShell.Section>
        <Flex
          justify="flex-start"
          align={isLogowordVisible ? "flex-start" : "center"}
          direction="column"
          wrap="wrap"
          mt={20}
          gap={10}
        >
          {menuData["REPORTS"].map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "module-active w-full rounded-lg"
                    : "w-full text-menuText"
                }
              >
                <Flex
                  key={item.id}
                  justify={isLogowordVisible ? "flex-start" : "center"}
                  align="flex-start"
                  direction="row"
                  wrap="wrap"
                  gap={15}
                  py={5}
                  w="100%"
                  className={`module ${isLogowordVisible ? "pl-4 font-regular rounded-lg" : null
                    }`}
                >
                  {isLogowordVisible ? (
                    <Icon size={22} />
                  ) : (
                    <TooltipIcon label={item.label} icon={<Icon size={22} />} />
                  )}
                  {isLogowordVisible && (
                    <Text className="no-underline text-sm">{item.label}</Text>
                  )}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

      </AppShell.Section>
    </AppShell.Navbar>
  );
}
