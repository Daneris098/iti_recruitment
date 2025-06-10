import { AppShell } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface Props {
  isShowIconLogout: boolean;
}

export default function Header({ isShowIconLogout }: Props) {
  const navigate = useNavigate();

  return (
    <AppShell.Header>
      <div className="w-full  flex items-center justify-center">
        <div className="w-[89%] 2xl:w-[92%] flex justify-between">
          <img src="logoword.png" className="w-28 2xl:w-40 cursor-pointer" alt="bg" onClick={() => navigate("/")} />

          {isShowIconLogout && (
            <p className="flex sm:gap-2 cursor-pointer items-center text-xs 2xl:text-xl text-[#6D6D6D]" onClick={() => navigate("/login")}>
              Exit Job Search
              <IconLogout size={22} />
            </p>
          )}
        </div>
      </div>
    </AppShell.Header>
  );
}
