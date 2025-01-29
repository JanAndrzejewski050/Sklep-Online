import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/react";
  import { XMarkIcon } from "@heroicons/react/24/outline";
  import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import CartItem from "../components/CartPage";
  
  export default function Checkout({ open, setOpen }) {
    const cart = useSelector((state) => state.cartReducer);
    const { cartItems } = cart;
  
    const total = cartItems
      .reduce((total, item) => total + item.qty * item.price, 0)
      .toFixed(2);
  
    return (
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-500 ease-in-out"
        />
  
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-12">
              <DialogPanel
                transition
                className="pointer-events-auto w-full max-w-lg transform transition duration-500 ease-in-out translate-x-0 sm:duration-700 bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg"
              >
                <div className="flex h-full flex-col overflow-y-scroll">
                  <div className="flex-1 overflow-y-auto p-8">
                    <div className="flex items-center justify-between mb-6">
                      <DialogTitle className="text-xl font-semibold text-gray-800">
                        Your Shopping Cart
                      </DialogTitle>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <XMarkIcon className="h-8 w-8" />
                      </button>
                    </div>
  
                    <CartItem cartItems={cartItems} />
                  </div>
  
                  <div className="border-t border-gray-300 px-6 py-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <p>Subtotal</p>
                      <p>${total}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Shipping calculated at checkout.
                    </p>
  
                    <div className="mt-4 flex justify-center gap-4">
                      <Link
                        to="/placeorder"
                        className="w-full rounded-lg border-2 border-indigo-600 bg-indigo-600 text-white py-3 text-center font-medium shadow-lg hover:bg-indigo-700 transition duration-200"
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
  
                    <div className="mt-4 text-center text-sm text-gray-600">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> →</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
  