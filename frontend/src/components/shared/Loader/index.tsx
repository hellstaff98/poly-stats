import React, { FC } from 'react';
import PageWrapper from '@components/shared/PageWrapper';
import { SpinnerCircular } from 'spinners-react';

const Loader: FC = () => {
    return (
        <PageWrapper>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <SpinnerCircular />
            </div>
        </PageWrapper>
    );
};

export default Loader;
