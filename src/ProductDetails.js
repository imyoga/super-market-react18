import {
  NavLink,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import ProductDetailInfo from "./ProductDetailInfo.js";
import ProductDetailNutrition from "./ProductDetailNutrition.js";
import ProductDetailStorage from "./ProductDetailStorage.js";
import useSWR from "swr";
import fetcher from "./fetcher.js";

export default function ProductDetails(props) {
  const params = useParams();
  const match = useRouteMatch();

  const { data: product = {}, error } = useSWR(
    `https://react-tutorial-demo.firebaseio.com/productinfo/id${params.id}.json`,
    fetcher
  );

  if (error) {
    return <p>Could not load product details. Please try again later.</p>;
  }

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url}>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + "/nutrition"}
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + "/storage"}
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={match.path}>
            <ProductDetailInfo
              onProductAdd={props.onProductAdd}
              product={product}
            />
          </Route>

          <Route path={match.path + "/nutrition"}>
            <ProductDetailNutrition nutrition={product.nutrition} />
          </Route>

          <Route path={match.path + "/storage"}>
            <ProductDetailStorage storage={product.storage} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
