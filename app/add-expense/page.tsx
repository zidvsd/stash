import AddExpenseForm from "@/components/AddExpenseForm";
export default function page() {
  return (
    <div className="mx-auto text-center mt-4 custom-container">
      <div className="text-left flex flex-col items-start lg:items-center">
        <div className="text-left lg:text-center">
          <h1 className="text-2xl font-bold full">Add Expense</h1>
          <p>Record a new expense transaction</p>
        </div>
        <div className="w-full ">
          <AddExpenseForm />
        </div>
      </div>
    </div>
  );
}
