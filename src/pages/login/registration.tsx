import { useState } from "react";
import { Input } from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const userData = {
        username,
        password,
        role: "user",
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        userData
      );
      setSuccess("Регистрация прошла успешно! Вы можете войти.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Не удалось зарегистрироваться. Попробуйте еще раз.");
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Panel className="w-[400px] p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <Label className="block mb-2 text-sm font-medium text-gray-500">
            Имя пользователя
          </Label>
          <Input
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Введите имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label className="block mb-2 text-sm font-medium text-gray-500">
            Пароль
          </Label>
          <Input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="w-full py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleRegistration}
        >
          Регистрация
        </Button>
        <div className="text-center">
          <Label className="block mb-2 text-sm font-medium text-gray-500">
            Уже есть аккаунт?
          </Label>
          <Link to="/">
            <Button className="w-full py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50">
              Войти
            </Button>
          </Link>
        </div>
      </Panel>
    </div>
  );
};
