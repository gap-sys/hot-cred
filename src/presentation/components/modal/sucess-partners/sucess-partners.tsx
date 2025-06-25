import Modal from 'react-modal';

import { IMAGE } from 'src/presentation/assets';

import styles from './sucess-partners.module.scss';

export const SuccessPartnersModal = ({ 
    isOpen, 
    onRequestClose, 
    contractSentSuccessfully = true 
}: { 
    isOpen: boolean; 
    onRequestClose: () => void;
    contractSentSuccessfully?: boolean;
}) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
    >
        <div className={styles.content}>
            <img src={IMAGE.LOGO_HOT_CRED.src} alt="Logo HotCred" className={styles.logo} />
            {contractSentSuccessfully ? (
                <>
                    <p>
                        Agora você receberá uma <b>mensagem da CLICKSIGN em seu email</b>.
                        Para finalizar o cadastro basta clicar no link enviado em seu email e assinar eletronicamente o seu contrato.
                    </p>
                    <a href="https://www.youtube.com/watch?v=mMnM4dBdH6s&embeds_referring_euri=https%3A%2F%2Fwww.americafinanceira.com.br%2F&source_ve_path=MjM4NTE">
                        <button className={styles.button}>
                            Clique aqui após assinar o contrato
                        </button>
                    </a>
                </>
            ) : (
                <>
                    <p>
                        <b>Seu cadastro foi realizado com sucesso!</b>
                    </p>
                    <p>
                        Nossa equipe entrará em contato com você brevemente para finalizar o processo de parceria.
                    </p>
                    <a href="https://www.youtube.com/watch?v=mMnM4dBdH6s&embeds_referring_euri=https%3A%2F%2Fwww.americafinanceira.com.br%2F&source_ve_path=MjM4NTE">
                        <button className={styles.button}>
                            Fechar
                        </button>
                    </a>
                </>
            )}
        </div>
    </Modal>
);
