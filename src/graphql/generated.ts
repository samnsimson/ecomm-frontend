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

export type BillingInfoDto = {
  __typename?: 'BillingInfoDto';
  addressOne: Scalars['String']['output'];
  addressTwo: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  email: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  state: Scalars['String']['output'];
  zipcode: Scalars['String']['output'];
};

export type BillingInfoInput = {
  addressOne: Scalars['String']['input'];
  addressTwo: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zipcode: Scalars['String']['input'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CartItem = {
  __typename?: 'CartItem';
  cart: Cart;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Int']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CartProductOutput = {
  __typename?: 'CartProductOutput';
  isDeductionsEligible: Scalars['Boolean']['output'];
  products: Array<ProductOutput>;
  subTotal: Scalars['Int']['output'];
  taxes?: Maybe<CartTaxes>;
  total: Scalars['Int']['output'];
};

export type CartTaxBreakup = {
  __typename?: 'CartTaxBreakup';
  amount?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  percentage?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type CartTaxes = {
  __typename?: 'CartTaxes';
  breakup: Array<CartTaxBreakup>;
  total: Scalars['Int']['output'];
};

export type CategoriesInput = {
  id: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  products?: Maybe<Array<Product>>;
  slug?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CategoryProductsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Coupon = {
  __typename?: 'Coupon';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<ProductIds>>;
  title: Scalars['String']['input'];
};

export type CreateCouponInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateDeliveryInfoInput = {
  billingAddress: BillingInfoInput;
  shippingAddress: ShippingInfoInput;
  userId: Scalars['String']['input'];
};

export type CreateDiscountInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
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
  brand: Scalars['String']['input'];
  categories?: InputMaybe<Array<CategoriesInput>>;
  description: Scalars['String']['input'];
  dimensions?: InputMaybe<Dimensions>;
  retailPrice: Scalars['Int']['input'];
  salePrice: Scalars['Int']['input'];
  shipping?: InputMaybe<ShippingMethod>;
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

export type CreateShippingInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: Scalars['Boolean']['input'];
  percentage?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  type: ShippingType;
};

export type CreateTaxInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled: Scalars['Boolean']['input'];
  percentage?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type?: InputMaybe<TaxTypes>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum Currency {
  Cad = 'CAD',
  Inr = 'INR',
  Usd = 'USD'
}

export type DeliveryInfo = {
  __typename?: 'DeliveryInfo';
  billingAddressOne?: Maybe<Scalars['String']['output']>;
  billingAddressTwo?: Maybe<Scalars['String']['output']>;
  billingCity?: Maybe<Scalars['String']['output']>;
  billingCountry?: Maybe<Scalars['String']['output']>;
  billingEmail?: Maybe<Scalars['String']['output']>;
  billingPhone?: Maybe<Scalars['String']['output']>;
  billingState?: Maybe<Scalars['String']['output']>;
  billingZipcode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  shippingAddressOne?: Maybe<Scalars['String']['output']>;
  shippingAddressTwo?: Maybe<Scalars['String']['output']>;
  shippingCity?: Maybe<Scalars['String']['output']>;
  shippingCountry?: Maybe<Scalars['String']['output']>;
  shippingState?: Maybe<Scalars['String']['output']>;
  shippingZipcode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type DeliveryInfoDto = {
  __typename?: 'DeliveryInfoDto';
  billingAddress?: Maybe<BillingInfoDto>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  shippingAddress?: Maybe<BillingInfoDto>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type DeltedUser = {
  __typename?: 'DeltedUser';
  id: Scalars['ID']['output'];
};

export type Dimensions = {
  depth?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type DimensionsResponse = {
  __typename?: 'DimensionsResponse';
  depth: Scalars['Float']['output'];
  height: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type Discount = {
  __typename?: 'Discount';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  authenticated: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createCoupon: Coupon;
  createDeliveryInfo: DeliveryInfoDto;
  createDiscount: Discount;
  createOrder: Order;
  createPayment: Payment;
  createProduct: Product;
  createProfile: Profile;
  createReview: Review;
  createShipping: Shipping;
  createTax: Tax;
  login: LoginResponse;
  refresh: RefreshTokenResponse;
  removeCategory: Category;
  removeCoupon: Coupon;
  removeDeliveryInfo: DeliveryInfo;
  removeDiscount: Discount;
  removeOrder: Order;
  removePayment: Payment;
  removeProduct: Product;
  removeProfile: Profile;
  removeReview: Review;
  removeShipping: Shipping;
  removeTax: Tax;
  removeUser: DeltedUser;
  saveSetting: Setting;
  signup: SignupResponse;
  updateCategory: Category;
  updateCoupon: Coupon;
  updateDeliveryInfo: DeliveryInfo;
  updateDiscount: Discount;
  updateOrder: Order;
  updatePayment: Payment;
  updateProduct: Product;
  updateProfile: Profile;
  updateReview: Review;
  updateShipping: Shipping;
  updateTax: Tax;
  updateUser: User;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateCouponArgs = {
  createCouponInput: CreateCouponInput;
};


export type MutationCreateDeliveryInfoArgs = {
  createDeliveryInfoInput: CreateDeliveryInfoInput;
};


export type MutationCreateDiscountArgs = {
  createDiscountInput: CreateDiscountInput;
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


export type MutationCreateShippingArgs = {
  createShippingInput: CreateShippingInput;
};


export type MutationCreateTaxArgs = {
  createTaxInput: CreateTaxInput;
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};


export type MutationRefreshArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCouponArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveDeliveryInfoArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveDiscountArgs = {
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


export type MutationRemoveShippingArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTaxArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationSaveSettingArgs = {
  settingsInput: SettingsInput;
};


export type MutationSignupArgs = {
  autoLogin?: InputMaybe<Scalars['Boolean']['input']>;
  signupInput: CreateUserInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateCouponArgs = {
  updateCouponInput: UpdateCouponInput;
};


export type MutationUpdateDeliveryInfoArgs = {
  updateDeliveryInfoInput: UpdateDeliveryInfoInput;
};


export type MutationUpdateDiscountArgs = {
  updateDiscountInput: UpdateDiscountInput;
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


export type MutationUpdateShippingArgs = {
  updateShippingInput: UpdateShippingInput;
};


export type MutationUpdateTaxArgs = {
  updateTaxInput: UpdateTaxInput;
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
  brand?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dimensions: DimensionsResponse;
  id: Scalars['ID']['output'];
  orders?: Maybe<Array<Order>>;
  retailPrice: Scalars['Int']['output'];
  reviews?: Maybe<Array<Review>>;
  salePrice: Scalars['Int']['output'];
  shipping?: Maybe<Shipping>;
  slug?: Maybe<Scalars['String']['output']>;
  stock: Scalars['Int']['output'];
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

export type ProductInfo = {
  id: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type ProductOutput = {
  __typename?: 'ProductOutput';
  id: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  retailPrice: Scalars['Int']['output'];
  salePrice: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  total: Scalars['Int']['output'];
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
  cart: CartProductOutput;
  categories: Array<Category>;
  category: Category;
  coupon: Coupon;
  coupons: Array<Coupon>;
  deliveryInfo: DeliveryInfoDto;
  deliveryInfos: Array<DeliveryInfoDto>;
  discount: Discount;
  discounts: Array<Discount>;
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
  setting: Setting;
  settings: Array<Setting>;
  shipping: Shipping;
  shippings: Array<Shipping>;
  tax: Tax;
  taxes: Array<Tax>;
  user: User;
  users: Array<User>;
};


export type QueryCartArgs = {
  input: Array<ProductInfo>;
};


export type QueryCategoriesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCouponArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDeliveryInfoArgs = {
  id: Scalars['String']['input'];
};


export type QueryDeliveryInfosArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDiscountArgs = {
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
  id?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
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


export type QuerySettingArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShippingArgs = {
  id: Scalars['String']['input'];
};


export type QueryShippingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTaxArgs = {
  id: Scalars['Int']['input'];
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

export type Setting = {
  __typename?: 'Setting';
  addressOne?: Maybe<Scalars['String']['output']>;
  addressTwo?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  couponsEnabled: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  discountsEnabled: Scalars['Boolean']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  shippingEnabled: Scalars['Boolean']['output'];
  state?: Maybe<Scalars['String']['output']>;
  taxesEnabled: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type SettingsInput = {
  addressOne?: InputMaybe<Scalars['String']['input']>;
  addressTwo?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  couponsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  shippingEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  taxesEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type Shipping = {
  __typename?: 'Shipping';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  percentage: Scalars['Int']['output'];
  products?: Maybe<Array<Product>>;
  title: Scalars['String']['output'];
  type: ShippingType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ShippingInfoInput = {
  addressOne: Scalars['String']['input'];
  addressTwo: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zipcode: Scalars['String']['input'];
};

export type ShippingMethod = {
  id: Scalars['String']['input'];
};

export enum ShippingType {
  Flat = 'FLAT',
  Free = 'FREE',
  Percentage = 'PERCENTAGE'
}

export type SignupResponse = {
  __typename?: 'SignupResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  authenticated?: Maybe<Scalars['Boolean']['output']>;
  cart?: Maybe<Cart>;
  createdAt: Scalars['DateTime']['output'];
  deliveryInfo?: Maybe<DeliveryInfoDto>;
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

export type Tax = {
  __typename?: 'Tax';
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  percentage?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  type: TaxTypes;
  updatedAt: Scalars['DateTime']['output'];
};

export enum TaxTypes {
  Flat = 'FLAT',
  Percentage = 'PERCENTAGE'
}

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  products?: InputMaybe<Array<ProductIds>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCouponInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateDeliveryInfoInput = {
  billingAddress?: InputMaybe<BillingInfoInput>;
  id: Scalars['String']['input'];
  shippingAddress?: InputMaybe<ShippingInfoInput>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDiscountInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
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
  brand?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<CategoriesInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  dimensions?: InputMaybe<Dimensions>;
  id: Scalars['ID']['input'];
  retailPrice?: InputMaybe<Scalars['Int']['input']>;
  salePrice?: InputMaybe<Scalars['Int']['input']>;
  shipping?: InputMaybe<ShippingMethod>;
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

export type UpdateShippingInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  percentage?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ShippingType>;
};

export type UpdateTaxInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  percentage?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TaxTypes>;
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
  deliveryInfo?: Maybe<DeliveryInfoDto>;
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

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, title: string, description?: string | null, slug?: string | null } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, title: string, description?: string | null, slug?: string | null, salePrice: number, retailPrice: number, createdAt: any } };

export type CreateProfileMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  input: CreateProfileInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', id: string, firstName: string, lastName?: string | null, profileImage?: string | null, addressOne: string, addressTwo?: string | null, city: string, state: string, country: string, zipcode: string } };

export type CreateShippingMutationVariables = Exact<{
  input: CreateShippingInput;
}>;


export type CreateShippingMutation = { __typename?: 'Mutation', createShipping: { __typename?: 'Shipping', id: string, title: string, description: string, enabled: boolean, type: ShippingType, amount: number, percentage: number } };

export type CreateTaxMutationVariables = Exact<{
  input: CreateTaxInput;
}>;


export type CreateTaxMutation = { __typename?: 'Mutation', createTax: { __typename?: 'Tax', id: string, title: string, description: string, type: TaxTypes, amount?: number | null, percentage?: number | null, enabled?: boolean | null, createdAt: any, updatedAt: any } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', id: string, username: string, email: string, name: string, role: string, authenticated: boolean, accessToken: string, refreshToken: string } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refresh: { __typename?: 'RefreshTokenResponse', accessToken: string } };

export type SaveSettingsMutationVariables = Exact<{
  input: SettingsInput;
}>;


export type SaveSettingsMutation = { __typename?: 'Mutation', saveSetting: { __typename?: 'Setting', id: string, addressOne?: string | null, addressTwo?: string | null, city?: string | null, state?: string | null, country?: string | null, zipcode?: string | null, currency: Currency, email?: string | null, phone?: string | null, taxesEnabled: boolean, couponsEnabled: boolean, shippingEnabled: boolean, discountsEnabled: boolean } };

export type SignupMutationVariables = Exact<{
  input: CreateUserInput;
  autoLogin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignupResponse', id: string, email: string, username: string, accessToken?: string | null, refreshToken?: string | null } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, firstName: string, lastName?: string | null, profileImage?: string | null, addressOne: string, addressTwo?: string | null, city: string, state: string, country: string, zipcode: string } };

export type UpdateShippingMutationVariables = Exact<{
  input: UpdateShippingInput;
}>;


export type UpdateShippingMutation = { __typename?: 'Mutation', updateShipping: { __typename?: 'Shipping', id: string, title: string, description: string, enabled: boolean, type: ShippingType, amount: number, percentage: number } };

export type UpdateTaxMutationVariables = Exact<{
  input: UpdateTaxInput;
}>;


export type UpdateTaxMutation = { __typename?: 'Mutation', updateTax: { __typename?: 'Tax', id: string, title: string, description: string, type: TaxTypes, amount?: number | null, percentage?: number | null, enabled?: boolean | null, createdAt: any, updatedAt: any } };

export type CartQueryVariables = Exact<{
  input: Array<ProductInfo> | ProductInfo;
}>;


export type CartQuery = { __typename?: 'Query', cart: { __typename?: 'CartProductOutput', total: number, subTotal: number, isDeductionsEligible: boolean, taxes?: { __typename?: 'CartTaxes', total: number, breakup: Array<{ __typename?: 'CartTaxBreakup', title: string, description: string, amount?: number | null, percentage?: number | null, total: number }> } | null, products: Array<{ __typename?: 'ProductOutput', id: string, title: string, slug: string, salePrice: number, retailPrice: number, quantity: number, total: number }> } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, title: string, description?: string | null, slug?: string | null, createdAt: any, updatedAt: any }> };

export type GetDeliveryInfoQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetDeliveryInfoQuery = { __typename?: 'Query', deliveryInfo: { __typename?: 'DeliveryInfoDto', id: string, createdAt: any, updatedAt: any, billingAddress?: { __typename?: 'BillingInfoDto', addressOne: string, addressTwo: string, city: string, state: string, country: string, zipcode: string, email: string, phone: string } | null, shippingAddress?: { __typename?: 'BillingInfoDto', addressOne: string, addressTwo: string, city: string, state: string, country: string, zipcode: string } | null } };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: string, total: number, quantity: number, createdAt: any, status: OrderStatus, payment: { __typename?: 'Payment', id: string, provider: PaymentProvider, status: PaymentStatus, amount: number, type: PaymentType }, products: Array<{ __typename?: 'Product', id: string, title: string, description?: string | null }> }> };

export type GetProductQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, title: string, description?: string | null, slug?: string | null, salePrice: number, retailPrice: number, brand?: string | null, dimensions: { __typename?: 'DimensionsResponse', width: number, height: number, depth: number }, categories?: Array<{ __typename?: 'Category', id: string, title: string, description?: string | null }> | null, reviews?: Array<{ __typename?: 'Review', id: string, review: string, rating: number }> | null, shipping?: { __typename?: 'Shipping', id: string, title: string, type: ShippingType, percentage: number, amount: number, enabled: boolean } | null } };

export type GetProductsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, description?: string | null, slug?: string | null, salePrice: number, retailPrice: number, brand?: string | null, dimensions: { __typename?: 'DimensionsResponse', width: number, height: number, depth: number }, categories?: Array<{ __typename?: 'Category', id: string, title: string, description?: string | null }> | null, reviews?: Array<{ __typename?: 'Review', id: string, review: string, rating: number }> | null, shipping?: { __typename?: 'Shipping', id: string, title: string, type: ShippingType, percentage: number, amount: number, enabled: boolean } | null }> };

export type GetSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingsQuery = { __typename?: 'Query', setting: { __typename?: 'Setting', id: string, addressOne?: string | null, addressTwo?: string | null, city?: string | null, state?: string | null, country?: string | null, zipcode?: string | null, email?: string | null, phone?: string | null, currency: Currency, taxesEnabled: boolean, couponsEnabled: boolean, shippingEnabled: boolean, discountsEnabled: boolean } };

export type GetShippingQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetShippingQuery = { __typename?: 'Query', shipping: { __typename?: 'Shipping', id: string, title: string, description: string, enabled: boolean, type: ShippingType, amount: number, percentage: number } };

export type GetShippingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShippingsQuery = { __typename?: 'Query', shippings: Array<{ __typename?: 'Shipping', id: string, title: string, description: string, enabled: boolean, type: ShippingType, amount: number, percentage: number }> };

export type GetTaxesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaxesQuery = { __typename?: 'Query', taxes: Array<{ __typename?: 'Tax', id: string, title: string, description: string, type: TaxTypes, amount?: number | null, percentage?: number | null, enabled?: boolean | null, createdAt: any, updatedAt: any }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, username: string, email: string, phone: string, phoneVerified?: boolean | null, emailVerified?: boolean | null, profile?: { __typename?: 'Profile', id: string, firstName: string, lastName?: string | null, addressOne: string, addressTwo?: string | null, city: string, state: string, country: string, zipcode: string, profileImage?: string | null } | null, deliveryInfo?: { __typename?: 'DeliveryInfoDto', id: string, billingAddress?: { __typename?: 'BillingInfoDto', addressOne: string, addressTwo: string, city: string, state: string, country: string, zipcode: string, email: string, phone: string } | null, shippingAddress?: { __typename?: 'BillingInfoDto', addressOne: string, addressTwo: string, city: string, state: string, country: string, zipcode: string } | null } | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, email: string, phone: string, emailVerified?: boolean | null, phoneVerified?: boolean | null, orders?: Array<{ __typename?: 'Order', id: string, products: Array<{ __typename?: 'Product', id: string, title: string, salePrice: number, retailPrice: number }> }> | null, profile?: { __typename?: 'Profile', id: string, firstName: string, lastName?: string | null, addressOne: string, city: string, state: string, country: string, zipcode: string, profileImage?: string | null } | null }> };


export const CreateCategoryDocument = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(createCategoryInput: $input) {
    id
    title
    description
    slug
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(createProductInput: $input) {
    id
    title
    description
    slug
    salePrice
    retailPrice
    createdAt
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($userId: String!, $input: CreateProfileInput!) {
  createProfile(userId: $userId, createProfileInput: $input) {
    id
    firstName
    lastName
    profileImage
    addressOne
    addressTwo
    city
    state
    country
    zipcode
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateShippingDocument = gql`
    mutation CreateShipping($input: CreateShippingInput!) {
  createShipping(createShippingInput: $input) {
    id
    title
    description
    enabled
    type
    amount
    percentage
  }
}
    `;
export type CreateShippingMutationFn = Apollo.MutationFunction<CreateShippingMutation, CreateShippingMutationVariables>;

/**
 * __useCreateShippingMutation__
 *
 * To run a mutation, you first call `useCreateShippingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShippingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShippingMutation, { data, loading, error }] = useCreateShippingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateShippingMutation(baseOptions?: Apollo.MutationHookOptions<CreateShippingMutation, CreateShippingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShippingMutation, CreateShippingMutationVariables>(CreateShippingDocument, options);
      }
export type CreateShippingMutationHookResult = ReturnType<typeof useCreateShippingMutation>;
export type CreateShippingMutationResult = Apollo.MutationResult<CreateShippingMutation>;
export type CreateShippingMutationOptions = Apollo.BaseMutationOptions<CreateShippingMutation, CreateShippingMutationVariables>;
export const CreateTaxDocument = gql`
    mutation CreateTax($input: CreateTaxInput!) {
  createTax(createTaxInput: $input) {
    id
    title
    description
    type
    amount
    percentage
    enabled
    createdAt
    updatedAt
  }
}
    `;
export type CreateTaxMutationFn = Apollo.MutationFunction<CreateTaxMutation, CreateTaxMutationVariables>;

/**
 * __useCreateTaxMutation__
 *
 * To run a mutation, you first call `useCreateTaxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaxMutation, { data, loading, error }] = useCreateTaxMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaxMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaxMutation, CreateTaxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaxMutation, CreateTaxMutationVariables>(CreateTaxDocument, options);
      }
export type CreateTaxMutationHookResult = ReturnType<typeof useCreateTaxMutation>;
export type CreateTaxMutationResult = Apollo.MutationResult<CreateTaxMutation>;
export type CreateTaxMutationOptions = Apollo.BaseMutationOptions<CreateTaxMutation, CreateTaxMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(credentials: $input) {
    id
    username
    email
    name
    role
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
export const RefreshTokenDocument = gql`
    mutation RefreshToken($input: RefreshTokenInput!) {
  refresh(refreshTokenInput: $input) {
    accessToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SaveSettingsDocument = gql`
    mutation SaveSettings($input: SettingsInput!) {
  saveSetting(settingsInput: $input) {
    id
    addressOne
    addressTwo
    city
    state
    country
    zipcode
    currency
    email
    phone
    taxesEnabled
    couponsEnabled
    shippingEnabled
    discountsEnabled
  }
}
    `;
export type SaveSettingsMutationFn = Apollo.MutationFunction<SaveSettingsMutation, SaveSettingsMutationVariables>;

/**
 * __useSaveSettingsMutation__
 *
 * To run a mutation, you first call `useSaveSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSettingsMutation, { data, loading, error }] = useSaveSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveSettingsMutation(baseOptions?: Apollo.MutationHookOptions<SaveSettingsMutation, SaveSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveSettingsMutation, SaveSettingsMutationVariables>(SaveSettingsDocument, options);
      }
export type SaveSettingsMutationHookResult = ReturnType<typeof useSaveSettingsMutation>;
export type SaveSettingsMutationResult = Apollo.MutationResult<SaveSettingsMutation>;
export type SaveSettingsMutationOptions = Apollo.BaseMutationOptions<SaveSettingsMutation, SaveSettingsMutationVariables>;
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
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(updateProfileInput: $input) {
    id
    firstName
    lastName
    profileImage
    addressOne
    addressTwo
    city
    state
    country
    zipcode
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateShippingDocument = gql`
    mutation UpdateShipping($input: UpdateShippingInput!) {
  updateShipping(updateShippingInput: $input) {
    id
    title
    description
    enabled
    type
    amount
    percentage
  }
}
    `;
export type UpdateShippingMutationFn = Apollo.MutationFunction<UpdateShippingMutation, UpdateShippingMutationVariables>;

/**
 * __useUpdateShippingMutation__
 *
 * To run a mutation, you first call `useUpdateShippingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShippingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShippingMutation, { data, loading, error }] = useUpdateShippingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateShippingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShippingMutation, UpdateShippingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShippingMutation, UpdateShippingMutationVariables>(UpdateShippingDocument, options);
      }
export type UpdateShippingMutationHookResult = ReturnType<typeof useUpdateShippingMutation>;
export type UpdateShippingMutationResult = Apollo.MutationResult<UpdateShippingMutation>;
export type UpdateShippingMutationOptions = Apollo.BaseMutationOptions<UpdateShippingMutation, UpdateShippingMutationVariables>;
export const UpdateTaxDocument = gql`
    mutation UpdateTax($input: UpdateTaxInput!) {
  updateTax(updateTaxInput: $input) {
    id
    title
    description
    type
    amount
    percentage
    enabled
    createdAt
    updatedAt
  }
}
    `;
export type UpdateTaxMutationFn = Apollo.MutationFunction<UpdateTaxMutation, UpdateTaxMutationVariables>;

/**
 * __useUpdateTaxMutation__
 *
 * To run a mutation, you first call `useUpdateTaxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaxMutation, { data, loading, error }] = useUpdateTaxMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaxMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaxMutation, UpdateTaxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaxMutation, UpdateTaxMutationVariables>(UpdateTaxDocument, options);
      }
export type UpdateTaxMutationHookResult = ReturnType<typeof useUpdateTaxMutation>;
export type UpdateTaxMutationResult = Apollo.MutationResult<UpdateTaxMutation>;
export type UpdateTaxMutationOptions = Apollo.BaseMutationOptions<UpdateTaxMutation, UpdateTaxMutationVariables>;
export const CartDocument = gql`
    query Cart($input: [ProductInfo!]!) {
  cart(input: $input) {
    total
    subTotal
    isDeductionsEligible
    taxes {
      total
      breakup {
        title
        description
        amount
        percentage
        total
      }
    }
    products {
      id
      title
      slug
      salePrice
      retailPrice
      quantity
      total
    }
  }
}
    `;

/**
 * __useCartQuery__
 *
 * To run a query within a React component, call `useCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCartQuery(baseOptions: Apollo.QueryHookOptions<CartQuery, CartQueryVariables> & ({ variables: CartQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartQuery, CartQueryVariables>(CartDocument, options);
      }
export function useCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartQuery, CartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartQuery, CartQueryVariables>(CartDocument, options);
        }
export function useCartSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CartQuery, CartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CartQuery, CartQueryVariables>(CartDocument, options);
        }
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export type CartLazyQueryHookResult = ReturnType<typeof useCartLazyQuery>;
export type CartSuspenseQueryHookResult = ReturnType<typeof useCartSuspenseQuery>;
export type CartQueryResult = Apollo.QueryResult<CartQuery, CartQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    id
    title
    description
    slug
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetDeliveryInfoDocument = gql`
    query GetDeliveryInfo($id: String!) {
  deliveryInfo(id: $id) {
    id
    createdAt
    updatedAt
    billingAddress {
      addressOne
      addressTwo
      city
      state
      country
      zipcode
      email
      phone
    }
    shippingAddress {
      addressOne
      addressTwo
      city
      state
      country
      zipcode
    }
  }
}
    `;

/**
 * __useGetDeliveryInfoQuery__
 *
 * To run a query within a React component, call `useGetDeliveryInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliveryInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliveryInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeliveryInfoQuery(baseOptions: Apollo.QueryHookOptions<GetDeliveryInfoQuery, GetDeliveryInfoQueryVariables> & ({ variables: GetDeliveryInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeliveryInfoQuery, GetDeliveryInfoQueryVariables>(GetDeliveryInfoDocument, options);
      }
export function useGetDeliveryInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeliveryInfoQuery, GetDeliveryInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeliveryInfoQuery, GetDeliveryInfoQueryVariables>(GetDeliveryInfoDocument, options);
        }
export function useGetDeliveryInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDeliveryInfoQuery, GetDeliveryInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeliveryInfoQuery, GetDeliveryInfoQueryVariables>(GetDeliveryInfoDocument, options);
        }
export type GetDeliveryInfoQueryHookResult = ReturnType<typeof useGetDeliveryInfoQuery>;
export type GetDeliveryInfoLazyQueryHookResult = ReturnType<typeof useGetDeliveryInfoLazyQuery>;
export type GetDeliveryInfoSuspenseQueryHookResult = ReturnType<typeof useGetDeliveryInfoSuspenseQuery>;
export type GetDeliveryInfoQueryResult = Apollo.QueryResult<GetDeliveryInfoQuery, GetDeliveryInfoQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  orders {
    id
    total
    quantity
    createdAt
    status
    payment {
      id
      provider
      status
      amount
      type
    }
    products {
      id
      title
      description
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export function useGetOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<typeof useGetOrdersSuspenseQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: String, $slug: String) {
  product(id: $id, slug: $slug) {
    id
    title
    description
    slug
    salePrice
    retailPrice
    brand
    dimensions {
      width
      height
      depth
    }
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
    shipping {
      id
      title
      type
      percentage
      amount
      enabled
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions?: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export function useGetProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductSuspenseQueryHookResult = ReturnType<typeof useGetProductSuspenseQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts($take: Int, $page: Int) {
  products(take: $take, skip: $page) {
    id
    title
    description
    slug
    salePrice
    retailPrice
    brand
    dimensions {
      width
      height
      depth
    }
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
    shipping {
      id
      title
      type
      percentage
      amount
      enabled
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
 *      take: // value for 'take'
 *      page: // value for 'page'
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
export const GetSettingsDocument = gql`
    query GetSettings {
  setting {
    id
    addressOne
    addressTwo
    city
    state
    country
    zipcode
    email
    phone
    currency
    taxesEnabled
    couponsEnabled
    shippingEnabled
    discountsEnabled
  }
}
    `;

/**
 * __useGetSettingsQuery__
 *
 * To run a query within a React component, call `useGetSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetSettingsQuery, GetSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSettingsQuery, GetSettingsQueryVariables>(GetSettingsDocument, options);
      }
export function useGetSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingsQuery, GetSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSettingsQuery, GetSettingsQueryVariables>(GetSettingsDocument, options);
        }
export function useGetSettingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSettingsQuery, GetSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSettingsQuery, GetSettingsQueryVariables>(GetSettingsDocument, options);
        }
export type GetSettingsQueryHookResult = ReturnType<typeof useGetSettingsQuery>;
export type GetSettingsLazyQueryHookResult = ReturnType<typeof useGetSettingsLazyQuery>;
export type GetSettingsSuspenseQueryHookResult = ReturnType<typeof useGetSettingsSuspenseQuery>;
export type GetSettingsQueryResult = Apollo.QueryResult<GetSettingsQuery, GetSettingsQueryVariables>;
export const GetShippingDocument = gql`
    query GetShipping($id: String!) {
  shipping(id: $id) {
    id
    title
    description
    enabled
    type
    amount
    percentage
  }
}
    `;

/**
 * __useGetShippingQuery__
 *
 * To run a query within a React component, call `useGetShippingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShippingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShippingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetShippingQuery(baseOptions: Apollo.QueryHookOptions<GetShippingQuery, GetShippingQueryVariables> & ({ variables: GetShippingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShippingQuery, GetShippingQueryVariables>(GetShippingDocument, options);
      }
export function useGetShippingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShippingQuery, GetShippingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShippingQuery, GetShippingQueryVariables>(GetShippingDocument, options);
        }
export function useGetShippingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetShippingQuery, GetShippingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShippingQuery, GetShippingQueryVariables>(GetShippingDocument, options);
        }
export type GetShippingQueryHookResult = ReturnType<typeof useGetShippingQuery>;
export type GetShippingLazyQueryHookResult = ReturnType<typeof useGetShippingLazyQuery>;
export type GetShippingSuspenseQueryHookResult = ReturnType<typeof useGetShippingSuspenseQuery>;
export type GetShippingQueryResult = Apollo.QueryResult<GetShippingQuery, GetShippingQueryVariables>;
export const GetShippingsDocument = gql`
    query GetShippings {
  shippings {
    id
    title
    description
    enabled
    type
    amount
    percentage
  }
}
    `;

/**
 * __useGetShippingsQuery__
 *
 * To run a query within a React component, call `useGetShippingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShippingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShippingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShippingsQuery(baseOptions?: Apollo.QueryHookOptions<GetShippingsQuery, GetShippingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShippingsQuery, GetShippingsQueryVariables>(GetShippingsDocument, options);
      }
export function useGetShippingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShippingsQuery, GetShippingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShippingsQuery, GetShippingsQueryVariables>(GetShippingsDocument, options);
        }
export function useGetShippingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetShippingsQuery, GetShippingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShippingsQuery, GetShippingsQueryVariables>(GetShippingsDocument, options);
        }
export type GetShippingsQueryHookResult = ReturnType<typeof useGetShippingsQuery>;
export type GetShippingsLazyQueryHookResult = ReturnType<typeof useGetShippingsLazyQuery>;
export type GetShippingsSuspenseQueryHookResult = ReturnType<typeof useGetShippingsSuspenseQuery>;
export type GetShippingsQueryResult = Apollo.QueryResult<GetShippingsQuery, GetShippingsQueryVariables>;
export const GetTaxesDocument = gql`
    query GetTaxes {
  taxes {
    id
    title
    description
    type
    amount
    percentage
    enabled
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTaxesQuery__
 *
 * To run a query within a React component, call `useGetTaxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaxesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTaxesQuery(baseOptions?: Apollo.QueryHookOptions<GetTaxesQuery, GetTaxesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaxesQuery, GetTaxesQueryVariables>(GetTaxesDocument, options);
      }
export function useGetTaxesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaxesQuery, GetTaxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaxesQuery, GetTaxesQueryVariables>(GetTaxesDocument, options);
        }
export function useGetTaxesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaxesQuery, GetTaxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaxesQuery, GetTaxesQueryVariables>(GetTaxesDocument, options);
        }
export type GetTaxesQueryHookResult = ReturnType<typeof useGetTaxesQuery>;
export type GetTaxesLazyQueryHookResult = ReturnType<typeof useGetTaxesLazyQuery>;
export type GetTaxesSuspenseQueryHookResult = ReturnType<typeof useGetTaxesSuspenseQuery>;
export type GetTaxesQueryResult = Apollo.QueryResult<GetTaxesQuery, GetTaxesQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  user(id: $id) {
    id
    username
    email
    phone
    phoneVerified
    emailVerified
    profile {
      id
      firstName
      lastName
      addressOne
      addressTwo
      city
      state
      country
      zipcode
      profileImage
    }
    deliveryInfo {
      id
      billingAddress {
        addressOne
        addressTwo
        city
        state
        country
        zipcode
        email
        phone
      }
      shippingAddress {
        addressOne
        addressTwo
        city
        state
        country
        zipcode
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
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