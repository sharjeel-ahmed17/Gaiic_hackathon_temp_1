// "use client";
// import { useState, useEffect } from "react";
// import { Products } from "@/types/products";
// import { client } from "@/sanity/lib/client";
// import { allProducts } from "@/lib/queries";
// import Image from "next/image";
// import Link from "next/link";
// import { addToCart } from "@/actions/actions";
// import { Button } from "@/components/ui/button";
// import Swal from "sweetalert2";
// // import { useRouter } from "next/navigation";


// const Home = () => {
//   // const router = useRouter();
//   const [products, setProducts] = useState<Products[]>([]);

//   const getAllProducts = async () => {
//     try {
//       const data: Products[] = await client.fetch<Products[]>(allProducts);
      
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   if (!products.length) {
//     return (
//       <div className="h-screen flex justify-center items-center text-[36px] font-bold">
//         Loading...
//       </div>
//     );
//   }
// const handleAddToCart = (e: React.MouseEvent,product : Products)=>{
//   e.preventDefault();
//   addToCart(product)
//   // alert("add to cart successfully")
//   // console.log("add to cart successfully");

//  Swal.fire({
//   position : "center",
//   icon: "success",
//   title: `${product.name} is Added Successfully`,
//   showConfirmButton : false,
//   timer: 1000,
  
//  })
// // router.push("/cart")


// }
//   return (
//     <div>
      
//      {/* {products.length} */}
//      <h1>Home</h1>
//      {
      
//      }
//      {
     
//       products.map((products)=>{
//         // console.log('error>>>',products.slug);
        
//         return(
//           <div key={products._id}>
//             <Link href={`/products/${products.slug}`} >go to details page</Link>
//             <h3>{products.name}</h3>
//             <Image src={products.imageUrl} width={200} height={200} alt={products.name}/>

//             <Button onClick={(e)=>handleAddToCart(e, products)}>add to cart</Button>

//           </div>
//         )
//       })
//      }
//     </div>
//   );
// };

// export default Home;

// // const ProductCard = () => {
// //   return (
// //     <div>
// //       {/* image */}
// //       <div className="relative w-[295px] h-[298px] rounded-[50px]">
// //         <Image
// //           src="/images/dummy.png"
// //           fill
// //           alt="dummy data"
// //           className="rounded-[20px] w-full h-full"
// //         />
// //         {/* if new exit then show new */}

// //         <span className="absolute top-2 right-10 bg-green-500 rounded-lg">new</span>
// //       </div>
// //       {/* title */}
// //       <h2>T-SHIRT WITH TAPE DETAILS</h2>
// //       {/* ratings */}
// //       <div className="flex">
// //         {/* star */}
// //         <div className="flex gap-2">
// //           <Star fill="yellow" stroke="none" />
// //           <Star fill="yellow" stroke="none" />
// //           <Star fill="yellow" stroke="none" />
// //           <Star fill="yellow" stroke="none" />
// //           <StarHalf fill="yellow" stroke="none" />
// //         </div>
// //         {/* counting  */}
// //         <div>
// //           <span>{3.5}</span>/5
// //         </div>
// //       </div>
// //       {/* price */}
// //       <div className="flex gap-2">
// //         <p>${120}</p>
// //         {/* if discount gain and show this div */}
// //         <div className="flex gap-2">
// //           <p>${260}</p>
// //           <span>-{20}%</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


"use client";
import { useState, useEffect } from "react";
import { Products } from "@/types/products";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const Home = () => {
  const [products, setProducts] = useState<Products[]>([]);

  const getAllProducts = async () => {
    try {
      const data: Products[] = await client.fetch<Products[]>(allProducts);
     const filterProduct = data.filter((product)=> product.inventory > 0)
     
      setProducts(filterProduct);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (!products.length) {
    return (
      <div className="h-screen flex justify-center items-center text-[36px] font-bold">
        Loading...
      </div>
    );
  }

  const handleAddToCart = (e: React.MouseEvent, product: Products) => {
    e.preventDefault();
    addToCart(product);

    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.name} is Added Successfully`,
      showConfirmButton: false,
      timer: 1000,
    });
  };


  return (
    <div>
      <h1>Home</h1>
      {
      
      products.map((product) => (
        <div key={product._id}>
          <Link href={`/products/${product.slug}`}>Go to details page</Link>
          <h3>{product.name}</h3>
          <Image src={product.imageUrl} width={200} height={200} alt={product.name} />
          <Button onClick={(e) => handleAddToCart(e, product)}>Add to cart</Button>
         <p>stock {product.inventory }</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
