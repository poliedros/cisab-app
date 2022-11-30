import CapTitle from "atoms/capTitle";
import Password from "components/registration/password";
import { useRouter } from "next/router";

export default function FirstAccess({ language = "pt" }: { language: "pt" }) {
  const router = useRouter();
  const { id } = router.query;

  async function registerPassword(password: string): Promise<boolean> {
    const response = await fetch(`/api/counties/manager/${id}`, {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    return await response.json();
  }
  return (
    <>
      <CapTitle base="county" label={"passwordRegistration"} />
      <Password handleSubmitFunction={registerPassword} />
    </>
  );
}
