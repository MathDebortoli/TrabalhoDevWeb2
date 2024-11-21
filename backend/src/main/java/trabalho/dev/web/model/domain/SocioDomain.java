package trabalho.dev.web.model.domain;

import jakarta.persistence.*;
import java.util.Date;

@Entity (name="Socio")
public class SocioDomain extends ClienteDomain {

    @OneToOne(cascade = CascadeType.ALL) // Relacionamento com dependentes
    private DependenteDomain dep1;

    @OneToOne(cascade = CascadeType.ALL)
    private DependenteDomain dep2;

    @OneToOne(cascade = CascadeType.ALL)
    private DependenteDomain dep3;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public SocioDomain() {
    }

    public SocioDomain(String nome, char sexo, String cpf, String rua, int numero, int telefone, Date dataNascimento) {
        super(nome, sexo, cpf, rua, numero, telefone, dataNascimento);
    }

    // Getters e Setters
    public DependenteDomain getDep1() {
        return dep1;
    }

    public void setDep1(DependenteDomain dep1) {
        this.dep1 = dep1;
    }

    public DependenteDomain getDep2() {
        return dep2;
    }

    public void setDep2(DependenteDomain dep2) {
        this.dep2 = dep2;
    }

    public DependenteDomain getDep3() {
        return dep3;
    }

    public void setDep3(DependenteDomain dep3) {
        this.dep3 = dep3;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
