import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      navigate("/genres");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username,
        password,
      });
      const { access_token } = response.data;
      Cookies.set("access_token", access_token, { expires: 1 });
      navigate("/genres"); // переход на главную страницу после успешного входа
    } catch (err) {
      setError("Не удалось войти. Проверьте имя пользователя и пароль.");
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Panel className="w-[400px] p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Войти</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
          onClick={handleLogin}
        >
          Войти
        </Button>
        <div className="text-center">
          <Label className="block mb-2 text-sm font-medium text-gray-500">
            Или вы можете зарегистрироваться
          </Label>
          <Link to="/registration">
            <Button className="w-full py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50">
              Регистрация
            </Button>
          </Link>
        </div>
      </Panel>
    </div>
  );
};
