import { useState } from "react";
import { motion } from "framer-motion";
import { Hourglass, Banknote } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LifeCountdownDemo() {
  const [age, setAge] = useState(30);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [assets, setAssets] = useState(5000000);
  const [income, setIncome] = useState(300000);
  const [expenses, setExpenses] = useState(250000);
  const [rate, setRate] = useState(3);

  const remainingYears = lifeExpectancy - age;
  const remainingDays = remainingYears * 365;

  // 資産シミュレーション
  let data = [];
  let currentAssets = assets;
  for (let year = 0; year <= remainingYears; year++) {
    currentAssets += (income - expenses) * 12;
    currentAssets *= 1 + rate / 100;
    data.push({ year: age + year, assets: Math.max(currentAssets, 0) });
  }

  const dailyBudget = Math.floor(currentAssets / remainingDays);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-indigo-500 flex flex-col items-center p-8 text-white">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">
        Life Countdown × 資産シミュレーション
      </h1>

      {/* 入力フォーム */}
      <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 mb-8 grid grid-cols-2 gap-4 w-full max-w-3xl">
        <label>
          年齢:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border p-1 ml-2 rounded"
          />
        </label>
        <label>
          想定寿命:
          <input
            type="number"
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(Number(e.target.value))}
            className="border p-1 ml-2 rounded"
          />
        </label>
        <label>
          現在資産(円):
          <input
            type="number"
            value={assets}
            onChange={(e) => setAssets(Number(e.target.value))}
            className="border p-1 ml-2 rounded"
          />
        </label>
        <label>
          月収(円):
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="border p-1 ml-2 rounded"
          />
        </label>
        <label>
          月支出(円):
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="border p-1 ml-2 rounded"
          />
        </label>
        <label>
          年利(%):
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="border p-1 ml-2 rounded"
          />
        </label>
      </div>

      {/* カウントダウンカード */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-2xl shadow-lg p-6 text-center w-full max-w-md mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Hourglass className="mx-auto w-12 h-12 mb-2" />
        <p className="text-6xl font-extrabold drop-shadow-lg">
          {remainingDays.toLocaleString()}
        </p>
        <p className="text-lg">日 残り</p>
      </motion.div>

      {/* 1日あたり円カード */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 mt-4 text-center w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Banknote className="mx-auto w-12 h-12 text-green-500 mb-2" />
        <p className="text-4xl font-extrabold text-green-600 drop-shadow-sm">
          ¥{dailyBudget.toLocaleString()} / DAY
        </p>
      </motion.div>

      {/* 資産推移グラフ */}
      <div className="w-full h-80 bg-white text-gray-800 p-4 rounded-2xl shadow-xl mt-8 max-w-4xl">
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="assets"
              stroke="url(#colorAssets)"
              strokeWidth={4}
              dot={false}
            />
            <CartesianGrid stroke="#ddd" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <defs>
              <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}