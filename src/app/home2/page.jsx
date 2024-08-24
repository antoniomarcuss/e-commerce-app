import { BASE_URL } from "@/consts";
import HomeContent from "./components/Content";
import { ProductsService } from "@/services/products";

const Home = async ({ searchParams }) => {
  let page = 1;
  const perPage = 10;
  if (searchParams.page && searchParams.page > 0) {
    page = Number(searchParams.page);
  }
  const response = await fetch(
    `${BASE_URL}/products?page=${page}&perPage=${perPage}`
  );
  const data = await response.json();
  console.log(data);

  return (
    <div className="min-h-screen ">
      <main className="pt-12 pb-10">
        <HomeContent data={data} defaultPage={page} />
      </main>
    </div>
  );
};

export default Home;
