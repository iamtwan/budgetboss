import { Accordion } from 'react-bootstrap';


const NavQuestions = () => {
    return (
        <Accordion flush>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>What is BudgetBoss?</Accordion.Header>
                <Accordion.Body>
                    BudgetBoss is designed to help you effectively track, analyze, and manage your personal finances, ensuring you're always in control of your money. Think of it as your non-intrusive pocket financial advisor!
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
                <Accordion.Header>How secure is connecting my bank account with the app?</Accordion.Header>
                <Accordion.Body>
                    BudgetBoss prioritizes your security. We use a ubiquitous third-party service called Plaid to securely connect your bank accounts. Plaid is trusted by many major financial institutions, ensuring that your data remains private and protected.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
                <Accordion.Header>I'm a bit wary of connecting my bank. Can I still use the app?</Accordion.Header>
                <Accordion.Body>
                    Absolutely! You can manually create accounts and add transactions if you'd prefer not to connect your bank. However, connecting via Plaid offers additional automated features like account updates, but the choice is yours.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='3'>
                <Accordion.Header>How will I benefit from connecting my bank account?</Accordion.Header>
                <Accordion.Body>
                    By connecting your bank account through Plaid, you'll receive automatic updates, keeping your records timely and accurate. It's like having your personal accountant keeping tabs without you lifting a finger.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='4'>
                <Accordion.Header>How can I track my monthly spending?</Accordion.Header>
                <Accordion.Body>
                    The app provides two insightful visual aids:
                    <br />
                    <br />
                    - 6-month bar chart to see trends in your monthly budget.
                    <br />
                    - Detailed monthly pie chart that categorizes your transactions, showing you where your money is going and how much you've saved or overspent.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='5'>
                <Accordion.Header>Can I set financial goals with BudgetBoss?</Accordion.Header>
                <Accordion.Body>
                    Absolutely! You can create specific financial goals, track your progress towards achieving them, and even archive them once completed. Setting a goal has never been easier or more motivating!
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='6'>
                <Accordion.Header>Are there any hidden fees associated with BudgetBoss?</Accordion.Header>
                <Accordion.Body>
                    Currently, BudgetBoss is completely free to use! No trials. No payment method required to get started. Should this policy change, rest assured a public announcement will be made.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='7'>
                <Accordion.Header>I need some guidance using BudgetBoss or I have additional questions. Is there customer support?</Accordion.Header>
                <Accordion.Body>
                    Of course! Our friendly support team is always ready to help. Reach out to us at @bbsupport.com or check our in-app guide for instant assistance.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='8'>
                <Accordion.Header>What happens if I spot an error in a transaction?</Accordion.Header>
                <Accordion.Body>
                    Errors can occur, especially with manual entries. Simply navigate to the specific transaction and choose the 'Edit' option. If the error is from an auto-update via Plaid, please contact our support for assistance.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default NavQuestions;
