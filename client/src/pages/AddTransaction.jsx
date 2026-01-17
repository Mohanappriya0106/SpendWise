import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import Card from "../components/ui/Card";

const AddTransaction = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/transactions");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-blue-700">
          Add Transaction
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          Record your income or expenses to keep your financial data accurate
          and up to date. Every transaction helps improve insights and budgeting.
        </p>
      </div>

      {/* Main Form */}
      <Card className="p-6">
        <TransactionForm onAdd={handleAdd} />
      </Card>

      {/* Helper Info */}
      <Card className="p-5 bg-slate-50 border border-slate-200">
        <h3 className="text-sm font-medium text-slate-700 mb-1">
          Tip
        </h3>
        <p className="text-sm text-slate-600">
          Categorizing transactions correctly improves monthly summaries,
          spending analysis, and budget accuracy.
        </p>
      </Card>
    </div>
  );
};

export default AddTransaction;

