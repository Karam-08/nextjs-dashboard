import Image from "next/image";

export default function Home() {

  let trigger = true

  if(trigger){
    return(<h1 className="bg-red-600">THIS IS CONDITIONALLY RENDERED</h1>)
  }
  return (
    <div>
      THIS IS THE DEFAULT RENDERING OF THIS PAGE
    </div>
  );
}
