"use client";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { ImConfused } from "react-icons/im";
import { twMerge } from "tailwind-merge";

import { Button, Container, Footer, GenericModal, Header } from "@/components";
import { useProducts } from "@/hooks";
import { ProductsClientPageInterface } from "@/types";

export const ClientPage: React.FC<ProductsClientPageInterface> = (props) => {
  const { products, token } = props;
  const { onDeleteProduct } = useProducts();
  const navigate = useRouter();

  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState({
    isOpen: false,
    productId: "",
    name: "",
  });

  const handleClose = () => setConfirmModalIsOpen((s) => ({ ...s, isOpen: false }));

  const deleteProduct = ({ name, productId }: { name: string; productId: string }) => {
    setConfirmModalIsOpen({
      isOpen: true,
      name,
      productId,
    });
  };

  const confirmDeleteProduct = async (id: string) => {
    try {
      const promise = onDeleteProduct({ requestId: id, token });

      await toast.promise(promise, {
        loading: "Aguarde...",
        error: "Erro ao excluir produto!",
        success: "Produto excluido!",
      });

      navigate.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
    }
  };

  useEffect(() => navigate.refresh(), [navigate]);

  if (isEmpty(products)) {
    return (
      <div className="flex flex-col items-center gap-4 h-full px-[2%] lg:px-[10%]">
        <Header variant="with" className="bg-ternary-900" />
        <Container className="items-center justify-center p-4 h-[70vh] gap-4">
          <ImConfused size="100px" className="text-ternary-500" />
          <h3 className="text-2xl font-bold text-center text-fontsColor-800 md:text-3xl lg:text-3xl">Não há produtos cadastrados!</h3>
          <Button variant="link" href="/p/a/products/new" className="gap-2 text-fontsColor-100 px-4 w-fit">
            Cadastre agora
            <CiCirclePlus size="20" />
          </Button>
        </Container>
        <Footer className="bg-ternary-900" />
      </div>
    );
  }

  return (
    <Fragment>
      <GenericModal
        isOpen={confirmModalIsOpen.isOpen}
        handleClose={handleClose}
        title="Deseja excluir este item?"
        description={`O produto ${confirmModalIsOpen.name} sera deletado`}
        icon={<AiFillCloseCircle size="30" />}
        handleClickButtonLeft={() => confirmDeleteProduct(confirmModalIsOpen.productId)}
        handleClickButtonRight={handleClose}
        messageButtonLeft="SIM"
        messageButtonRight="NÃO"
      />
      <div className="flex flex-col items-center gap-4 h-full px-[2%] lg:px-[10%]">
        <Header variant="with" className="bg-ternary-900" />
        <Container className="pt-10">
          <div className="flex items-center justify-between w-full mb-5 lg:mb-0">
            <h1 className="text-2xl font-extrabold text-fontsColor-800">Produtos</h1>

            <Button variant="link" href="/p/a/products/new" className="w-44 self-end bg-white shadow gap-2">
              Novo Produto
              <CiCirclePlus size="20" />
            </Button>
          </div>

          <div
            className={twMerge(
              "overflow-y-auto grid grid-cols-1 w-full gap-4 max-h-[58vh] lg:grid-cols-2 xl:grid-cols-3",
              products.length > 6 && "hide-scrollbar lg:overflow-y-scroll lg:pr-4",
            )}
          >
            {products.map((product) => {
              let { amount_points, description, display_name, id, image_url = "/empty_product.png" } = product;

              return (
                <div key={`${id}-${display_name}`} className="relative overflow-hidden group h-48 rounded-xl bg-white shadow-md">
                  <div className="block w-full h-full">
                    <Image
                      src={image_url || "/empty_product.png"}
                      blurDataURL={image_url || "/empty_product.png"}
                      placeholder="blur"
                      className="absolute transition-all object-cover top-0 group-hover:top-[-90%] rounded-xl w-full h-full"
                      alt={`Imagem de produto ${display_name}+${id}`}
                      width={500}
                      height={500}
                      quality={100}
                    />
                    <div className="flex flex-col items-start justify-end p-6 gap-4 w-full h-full">
                      <span className="text-fontsColor-900 font-medium text-md">
                        {display_name} - {amount_points} pontos
                      </span>
                      {!isEmpty(description) && <span className="text-fontsColor-700 font-light text-sm">{description}</span>}

                      <div className="flex w-full gap-4 text-sm">
                        <Button
                          variant="link"
                          href={`/p/a/products/edit/productId?productId=${id}`}
                          className="text-fontsColor-200 bg-ternary-700"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="button"
                          hasType={false}
                          className="text-fontsColor-200 bg-red-500"
                          onClick={() => deleteProduct({ name: display_name, productId: id })}
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        <Footer className="bg-ternary-900" />
      </div>
    </Fragment>
  );
};
