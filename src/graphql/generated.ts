import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  products: Array<Product>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  products?: Maybe<Array<Product>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CategoryProductsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCartInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<ProductIds>>;
  title: Scalars['String']['input'];
};

export type CreateOrderInput = {
  productIds: Array<Scalars['String']['input']>;
  quantity: Scalars['Int']['input'];
  total: Scalars['Float']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProfileInput = {
  addressOne: Scalars['String']['input'];
  addressTwo?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
  state: Scalars['String']['input'];
  zipcode: Scalars['String']['input'];
};

export type CreateReviewInput = {
  id: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeltedUser = {
  __typename?: 'DeltedUser';
  id: Scalars['ID']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  authenticated: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  role: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCart: Cart;
  createCategory: Category;
  createOrder: Order;
  createPayment: Payment;
  createProduct: Product;
  createProfile: Profile;
  createReview: Review;
  login: LoginResponse;
  refresh: RefreshTokenResponse;
  removeCart: Cart;
  removeCategory: Category;
  removeOrder: Order;
  removePayment: Payment;
  removeProduct: Product;
  removeProfile: Profile;
  removeReview: Review;
  removeUser: DeltedUser;
  signup: SignupResponse;
  updateCart: Cart;
  updateCategory: Category;
  updateOrder: Order;
  updatePayment: Payment;
  updateProduct: Product;
  updateProfile: Profile;
  updateReview: Review;
  updateUser: User;
};


export type MutationCreateCartArgs = {
  createCartInput: CreateCartInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateProfileArgs = {
  createProfileInput: CreateProfileInput;
  userId: Scalars['String']['input'];
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationRefreshArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationRemoveCartArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveOrderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePaymentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveReviewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  autoLogin?: InputMaybe<Scalars['Boolean']['input']>;
  signupInput: CreateUserInput;
};


export type MutationUpdateCartArgs = {
  updateCartInput: UpdateCartInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdatePaymentArgs = {
  updatePaymentInput: UpdatePaymentInput;
};


export type MutationUpdateProductArgs = {
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};


export type MutationUpdateReviewArgs = {
  updateReviewInput: UpdateReviewInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  payment: Payment;
  products: Array<Product>;
  quantity: Scalars['Int']['output'];
  status: OrderStatus;
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum OrderStatus {
  Calcelled = 'CALCELLED',
  Delivered = 'DELIVERED',
  Placed = 'PLACED'
}

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  failedReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  order: Order;
  provider: PaymentProvider;
  status: PaymentStatus;
  type: PaymentType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum PaymentProvider {
  Stripe = 'STRIPE'
}

export enum PaymentStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED'
}

export enum PaymentType {
  Card = 'CARD',
  Cash = 'CASH'
}

export type Product = {
  __typename?: 'Product';
  carts?: Maybe<Array<Cart>>;
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  orders?: Maybe<Array<Order>>;
  retailPrice: Scalars['Float']['output'];
  reviews?: Maybe<Array<Review>>;
  salePrice: Scalars['Float']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type ProductReviewsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductIds = {
  id: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  addressOne: Scalars['String']['output'];
  addressTwo?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  zipcode: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cart: Cart;
  carts: Array<Cart>;
  categories: Array<Category>;
  category: Category;
  order: Order;
  orders: Array<Order>;
  payment: Payment;
  payments: Array<Payment>;
  product: Product;
  products: Array<Product>;
  profile: Profile;
  profiles: Array<Profile>;
  review: Review;
  reviews: Array<Review>;
  user: User;
  users: Array<User>;
};


export type QueryCartArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCategoriesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrdersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPaymentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProfileArgs = {
  id: Scalars['String']['input'];
};


export type QueryProfilesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReviewsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type RefreshTokenInput = {
  token: Scalars['String']['input'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  accessToken: Scalars['String']['output'];
};

export type Review = {
  __typename?: 'Review';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Float']['output'];
  review: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  authenticated?: Maybe<Scalars['Boolean']['output']>;
  cart?: Maybe<Cart>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  orders?: Maybe<Array<Order>>;
  phone: Scalars['String']['output'];
  phoneVerified?: Maybe<Scalars['Boolean']['output']>;
  profile?: Maybe<Profile>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  reviews: Array<Review>;
  role?: Maybe<UserRole>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UpdateCartInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  products?: InputMaybe<Array<ProductIds>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderInput = {
  id: Scalars['String']['input'];
  productIds?: InputMaybe<Array<Scalars['String']['input']>>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePaymentInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  addressOne?: InputMaybe<Scalars['String']['input']>;
  addressTwo?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReviewInput = {
  id: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  cart?: Maybe<Cart>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  orders?: Maybe<Array<Order>>;
  phone: Scalars['String']['output'];
  phoneVerified?: Maybe<Scalars['Boolean']['output']>;
  profile?: Maybe<Profile>;
  reviews: Array<Review>;
  role?: Maybe<UserRole>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', id: string, username: string, authenticated: boolean, accessToken: string, refreshToken: string } };

export type SignupMutationVariables = Exact<{
  input: CreateUserInput;
  autoLogin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignupResponse', id: string, email: string, username: string, accessToken?: string | null, refreshToken?: string | null } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, description?: string | null, slug?: string | null, salePrice: number, retailPrice: number, categories?: Array<{ __typename?: 'Category', id: string, title: string, description?: string | null }> | null, reviews?: Array<{ __typename?: 'Review', id: string, review: string, rating: number }> | null }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, email: string, phone: string, emailVerified?: boolean | null, phoneVerified?: boolean | null, orders?: Array<{ __typename?: 'Order', id: string, products: Array<{ __typename?: 'Product', id: string, title: string, salePrice: number, retailPrice: number }> }> | null, profile?: { __typename?: 'Profile', id: string, firstName: string, lastName?: string | null, addressOne: string, city: string, state: string, country: string, zipcode: string, profileImage?: string | null } | null }> };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(credentials: $input) {
    id
    username
    authenticated
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($input: CreateUserInput!, $autoLogin: Boolean) {
  signup(signupInput: $input, autoLogin: $autoLogin) {
    id
    email
    username
    accessToken
    refreshToken
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *      autoLogin: // value for 'autoLogin'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    title
    description
    slug
    salePrice
    retailPrice
    categories {
      id
      title
      description
    }
    reviews {
      id
      review
      rating
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export function useGetProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsSuspenseQueryHookResult = ReturnType<typeof useGetProductsSuspenseQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    username
    email
    phone
    emailVerified
    phoneVerified
    orders {
      id
      products {
        id
        title
        salePrice
        retailPrice
      }
    }
    profile {
      id
      firstName
      lastName
      addressOne
      city
      state
      country
      zipcode
      profileImage
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;