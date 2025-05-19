export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Welcome Merchant</h1>
    </div>
  );
}


