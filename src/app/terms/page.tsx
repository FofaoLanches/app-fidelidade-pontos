import { Fragment } from "react";

import { Container, Header } from "@/components";

export default function Page() {
  return (
    <Fragment>
      <Header variant="without" className="bg-ternary-900" />

      <Container className="pb-[60px] px-[10%] lg:px-[20%]">
        <h1 className="text-ternary-500 font-bold text-lg">Termos de Uso e Política de Privacidade</h1>
        <p>
          Bem-vindo aos Termos de Uso e Política de Privacidade do Fofão Lanches, o seu sistema de pontos que valoriza a sua preferência e
          fidelidade. Ao utilizar nossos serviços, você concorda com os termos e condições aqui estabelecidos.
        </p>
        <ol className="flex flex-col gap-6">
          <li className="font-bold">1. Privacidade dos Dados</li>
          <p>
            O Fofão Lanches valoriza a privacidade dos seus clientes e está em total conformidade com a Lei Geral de Proteção de Dados
            (LGPD). Todos os dados fornecidos pelos usuários são tratados com o máximo cuidado e segurança. Esses dados serão utilizados
            exclusivamente para os fins descritos neste documento e não serão compartilhados com terceiros sem o consentimento expresso do
            usuário, exceto nos casos previstos em lei.
          </p>

          <li className="font-bold">2. Coleta e Uso de Dados</li>
          <p>
            Ao se cadastrar em nosso sistema de pontos de fidelidade, podemos solicitar informações pessoais, como nome, endereço de e-mail,
            número de telefone, entre outros. Essas informações são utilizadas para melhorar a sua experiência conosco, oferecer promoções
            personalizadas, enviar notificações relevantes e facilitar a comunicação entre o Fofão Lanches e você, nosso cliente.
          </p>
          <li className="font-bold">3. Segurança dos Dados</li>
          <p>
            Nós nos comprometemos a adotar as medidas de segurança necessárias para proteger os seus dados contra acesso não autorizado, uso
            indevido, alteração ou destruição. Utilizamos tecnologias e práticas recomendadas para garantir a segurança das informações
            coletadas.
          </p>
          <li className="font-bold">4. Perda de Pontos e Falhas no Sistema</li>
          <p>
            O Fofão Lanches isenta-se de responsabilidade em casos de perda de pontos de fidelidade decorrente de falhas técnicas,
            atualizações no sistema, interrupções no serviço ou outros eventos fora do nosso controle. Faremos o máximo para corrigir
            eventuais falhas o mais rápido possível, mas não podemos garantir a restituição integral dos pontos perdidos.
          </p>
          <li className="font-bold">5. Comportamento Indevido e Banimento de Usuários</li>
          <p>
            Reservamo-nos o direito de banir usuários que apresentarem comportamento indevido no sistema, incluindo, mas não se limitando a,
            tentativas de fraude, uso de linguagem ofensiva, violação dos Termos de Uso, entre outras condutas consideradas inadequadas pela
            equipe Fofão Lanches. O banimento poderá ocorrer sem aviso prévio e sem direito a reembolso de pontos acumulados.
          </p>
          <li className="font-bold">6. Alterações nos Termos de Uso e Política de Privacidade</li>
          <p>
            O Fofão Lanches reserva-se o direito de atualizar ou modificar os Termos de Uso e Política de Privacidade a qualquer momento,
            sem aviso prévio. Recomendamos que você revise regularmente este documento para estar ciente de eventuais alterações. O uso
            contínuo dos nossos serviços após a publicação de alterações constitui a sua aceitação dos novos termos. Ao utilizar os serviços
            do Fofão Lanches, você concorda integralmente com estes Termos de Uso e Política de Privacidade. Se tiver alguma dúvida ou
            preocupação sobre este documento, entre em contato conosco através dos canais de comunicação disponíveis em nosso site.
          </p>
        </ol>
        <p>
          Obrigado por escolher o Fofão Lanches como sua opção de refeição e fidelidade. Estamos aqui para servi-lo da melhor maneira
          possível.
        </p>
      </Container>
    </Fragment>
  );
}
